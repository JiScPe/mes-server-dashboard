import dotenv from "dotenv";
import path from "path";
import { WebSocketServer } from "ws";
import { Client } from "ssh2";
// Ensure this path matches where you manually placed the file in 'standalone'
import { ALL_SERVERS } from "../../lib/utils/server-list";

/**
 * Starts the SSH WebSocket server.
 * Wrapped in a function to be called by Next.js standalone server.js
 */
export function startSshWebSocket() {
  // Use __dirname to ensure the .env is found relative to this script, 
  // avoiding issues with IIS's default working directory
  const envPath = path.resolve(__dirname, ".env.ws.production");
  const result = dotenv.config({ path: envPath });

  console.log("----------------------------------------");
  if (result.error) {
    console.warn("[WS] Warning: Could not find .env.ws.production at", envPath);
  } else {
    console.log("[WS] Loaded environment from .env.ws.production");
  }

  const serverKeys = Object.keys(ALL_SERVERS || {});

  if (serverKeys.length === 0) {
    console.error("❌ FATAL: No servers found in ALL_SERVERS.");
    // In a unified setup, we don't want to kill the whole process (Next.js), 
    // so we just return instead of process.exit(1)
    return;
  }

  console.log(`✅ Ready to proxy ${serverKeys.length} server(s)`);
  console.log("----------------------------------------");

  const WS_PORT: number = parseInt(process.env.WS_PORT || "3001");
  
  // Create the WebSocket server
  const wss = new WebSocketServer({ port: WS_PORT });

  wss.on("listening", () => {
    console.log(`[WS] SSH Gateway listening on port ${WS_PORT}`);
  });

  wss.on("connection", (ws, req) => {
    const ip = req.socket.remoteAddress;
    const url = new URL(req.url || "", `ws://${req.headers.host}`);
    const serverName = url.searchParams.get("server");

    if (!serverName || !ALL_SERVERS[serverName]) {
      console.log(`[WS] Connection rejected: Invalid server '${serverName}' from ${ip}`);
      ws.send("Error: Invalid or missing server parameter");
      ws.close();
      return;
    }

    console.log(`[WS] Connecting ${ip} to ${serverName}...`);

    const sshConfig = ALL_SERVERS[serverName];
    const conn = new Client();

    conn.on("ready", () => {
      conn.shell({ term: "xterm-256color" }, (err, stream) => {
        if (err) {
          ws.send(`[SSH Error] ${err.message}`);
          ws.close();
          return;
        }

        // Send initial newline to prompt the shell
        stream.write("\n");

        ws.on("message", (msg) => stream.write(msg.toString()));
        stream.on("data", (data: Buffer) => ws.send(data.toString()));

        ws.on("close", () => {
          stream.end();
          conn.end();
        });
        
        stream.on("close", () => {
          ws.close();
          conn.end();
        });
      });
    });

    conn.on("error", (err) => {
      console.error(`[SSH] connection error for ${serverName}:`, err.message);
      ws.send(`SSH Connection Failed: ${err.message}`);
      ws.close();
    });

    conn.connect(sshConfig);
  });
}