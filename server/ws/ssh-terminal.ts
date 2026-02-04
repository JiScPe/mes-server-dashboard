import dotenv from "dotenv";
dotenv.config();

import { WebSocketServer } from "ws";
import { Client } from "ssh2";
import { ALL_SERVERS } from "../../lib/utils/server-list";

// --- START VALIDATION BLOCK ---
console.log("----------------------------------------");
console.log("[System] Validating Server List...");

const serverKeys = Object.keys(ALL_SERVERS || {});

if (serverKeys.length === 0) {
  console.error(
    "❌ FATAL: No servers found in ALL_SERVERS. Check '../../lib/utils/server-list'",
  );
  process.exit(1); // Exit if no servers are loaded
} else {
  // Loop through every key to get the specific config
  serverKeys.forEach((key) => {
    const config = ALL_SERVERS[key];

    // This addresses your request to get 'serverKeys.host'
    console.log(`🔹 ${key.padEnd(20)} -> Host: ${config.host}`);
  });
}
console.log("----------------------------------------");

console.log(
  `✅ Loaded ${serverKeys.length} server(s): [ ${serverKeys.join(", ")} ]`,
);

// Show a sample of the first server to verify structure (be careful with passwords in logs)
const sampleKey = serverKeys[0];
console.log(`\n🔍 Sample Config for '${sampleKey}':`);
console.log(JSON.stringify(ALL_SERVERS[sampleKey], null, 2));
console.log("----------------------------------------\n");
// --- END VALIDATION BLOCK ---

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
        // cols: 100,
        // rows: 30,
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
      },
    );
  });

  conn.on("error", (err) => {
    console.error("[SSH] Connection error:", err.message);
    ws.close();
  });

  conn.connect(sshConfig);
});
