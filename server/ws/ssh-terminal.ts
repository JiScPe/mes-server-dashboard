import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer } from "ws";
import { Client } from "ssh2";
import { ALL_SERVERS } from "../../lib/utils/server-list";

console.log("[WS] Starting SSH WebSocket server...");

const WS_PORT: number = parseInt(process.env.WS_PORT || "3001");
const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`[WS] Listening on port ${WS_PORT}`);
});

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[WS] Client connected from ${ip}`);

  const url = new URL(req.url || "", `ws://${req.headers.host}`);

  const server = url.searchParams.get("server");

  if (!server) {
    ws.send("Missing server parameter");
    ws.close();
    return;
  }

  const sshConfig = ALL_SERVERS[server];
  console.log(JSON.stringify(sshConfig, null, 2));

  console.log(`[WS] Requested server: ${server}`);

  const conn = new Client();

  conn.on("ready", () => {
    console.log(`[SSH] Connected to ${server}`);

    conn.shell(
      {
        term: "xterm-256color",
        cols: 100,
        rows: 30,
      },
      (err, stream) => {
        if (err) {
          console.error("[SSH] Shell error:", err.message);
          ws.close();
          return;
        }

        console.log("[SSH] Shell opened");

        stream.write("\n"); // <-- IMPORTANT

        ws.on("message", (msg) => {
        //   console.log("[WS] → SSH:", msg.toString());
          stream.write(msg.toString());
        });

        stream.on("data", (data: Buffer) => ws.send(data.toString()));

        ws.on("close", () => {
          console.log("[WS] Client disconnected");
          stream.end();
          conn.end();
        });
      }
    );
  });

  conn.on("error", (err) => {
    console.error("[SSH] Connection error:", err.message);
    ws.close();
  });

  conn.connect(sshConfig);
});
