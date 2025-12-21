import { WebSocketServer } from "ws";
import { Client } from "ssh2";

console.log("[WS] Starting SSH WebSocket server...");

const WS_PORT: number = parseInt(process.env.WS_PORT || "3001");
const wss = new WebSocketServer({ port: WS_PORT });

wss.on("listening", () => {
  console.log(`[WS] Listening on port ${WS_PORT}`);
});

wss.on("connection", (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`[WS] Client connected from ${ip}`);

  const url = new URL(req.url!, WS_PORT.toString());
  const server = url.searchParams.get("server");

  console.log(`[WS] Requested server: ${server}`);

  const conn = new Client();

  conn.on("ready", () => {
    console.log(`[SSH] Connected to ${server}`);

    conn.shell((err, stream) => {
      if (err) {
        console.error("[SSH] Shell error:", err.message);
        ws.close();
        return;
      }

      console.log("[SSH] Shell opened");

      ws.on("message", (msg) => stream.write(msg.toString()));
      stream.on("data", (data: any) => ws.send(data.toString()));

      ws.on("close", () => {
        console.log("[WS] Client disconnected");
        stream.end();
        conn.end();
      });
    });
  });

  conn.on("error", (err) => {
    console.error("[SSH] Connection error:", err.message);
    ws.close();
  });

  conn.connect({
    host: "10.0.202.12",
    username: "root",
    password: "******",
  });
});
