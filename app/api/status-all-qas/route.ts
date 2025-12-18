import { modules } from "@/lib/utils/modules-list";
import { qas_servers } from "@/lib/utils/server-list";
import { NextResponse } from "next/server";
import { Client } from "ssh2";

interface SSHConfig {
  host: string;
  port: number;
  username: string;
  password?: string;
  privateKey?: string;
}

/**
 * Open ONE SSH connection per server
 */
function openSSH(config: SSHConfig): Promise<Client> {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn
      .on("ready", () => resolve(conn))
      .on("error", (err) => reject(err))
      .connect(config);
  });
}

/**
 * Execute command using an EXISTING SSH connection
 */
function execCommand(conn: Client, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);

      let output = "";
      let error = "";

      stream
        .on("data", (data: Buffer) => {
          output += data.toString();
        })
        .stderr.on("data", (data: Buffer) => {
          error += data.toString();
        })
        .on("close", () => {
          if (error) reject(new Error(error));
          else resolve(output.trim());
        });
    });
  });
}

export async function GET() {
  try {
    const allServerStatus = await Promise.all(
      Object.entries(qas_servers).map(async ([serverName, config]) => {
        let conn: Client | null = null;

        try {
          // 1️⃣ Open ONE SSH connection for this server
          conn = await openSSH(config);

          const moduleStatus = [] as any[];

          // 2️⃣ Check modules SEQUENTIALLY to avoid overload
          for (const module of modules) {
            try {
              const cmd = `pgrep -f ${module}`;
              const result = await execCommand(conn, cmd);

              moduleStatus.push({
                module,
                status: result ? "RUNNING" : "STOPPED",
                pid: result || null,
              });
            } catch {
              moduleStatus.push({
                module,
                status: "STOPPED",
                pid: null,
              });
            }
          }

          return {
            server: serverName,
            status: "ONLINE",
            modules: moduleStatus,
          };
        } catch (err: any) {
          return {
            server: serverName,
            status: "OFFLINE",
            error: err.message || "SSH connection failed",
            modules: [],
          };
        } finally {
          // 3️⃣ Always close SSH connection
          if (conn) conn.end();
        }
      })
    );

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      servers: allServerStatus,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Unexpected server failure" },
      { status: 500 }
    );
  }
}
