import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer } from "ws";
import { Client } from "ssh2";
import { ALL_SERVERS } from "../../lib/utils/server-list";

const WS_PORT = parseInt(process.env.WS_PORT || "3001");
const wss = new WebSocketServer({ port: WS_PORT });

console.log(`[WS] Listening on port ${WS_PORT}`);

wss.on("connection", (ws, req) => {
  const url = new URL(req.url || "", `ws://${req.headers.host}`);
  const serverKey = url.searchParams.get("server");

  if (!serverKey || !ALL_SERVERS[serverKey]) {
    ws.send("Invalid server");
    ws.close();
    return;
  }

  const baseConfig = ALL_SERVERS[serverKey];
  const conn = new Client();

  let authenticated = false;
  let shellStream: any;

  ws.send("AUTH_REQUIRED");

  ws.on("message", (raw) => {
    const message = raw.toString();

    /** Step 1: Expect AUTH payload */
    if (!authenticated) {
      try {
        const payload = JSON.parse(message);

        if (payload.type !== "AUTH" || !payload.password) {
          ws.send("AUTH_INVALID");
          ws.close();
          return;
        }

        authenticated = true;

        conn.on("ready", () => {
          conn.shell(
            { term: "xterm-256color" },
            (err, stream) => {
              if (err) {
                ws.send("SHELL_ERROR");
                ws.close();
                return;
              }

              shellStream = stream;
              stream.write("\n");

              stream.on("data", (data: Buffer) => {
                ws.send(data.toString());
              });
            }
          );
        });

        conn.on("error", (err) => {
          ws.send(`SSH_ERROR: ${err.message}`);
          ws.close();
        });

        /** Step 2: Connect with dynamic password */
        conn.connect({
          ...baseConfig,
          password: payload.password,
        });

      } catch {
        ws.send("AUTH_PARSE_ERROR");
        ws.close();
      }

      return;
    }

    /** Step 3: Normal terminal input */
    if (shellStream) {
      shellStream.write(message);
    }
  });

  ws.on("close", () => {
    shellStream?.end();
    conn.end();
  });
});
