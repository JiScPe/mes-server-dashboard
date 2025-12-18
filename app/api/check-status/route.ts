// app/api/check-status/route.ts
import { qas_servers } from "@/lib/utils/server-list";
import { SSHConfig } from "@/types/servers";
import { NextResponse } from "next/server";
import { Client } from "ssh2";

function runSSHCommand(config: SSHConfig, command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn
      .on("ready", () => {
        conn.exec(command, (err, stream) => {
          if (err) {
            conn.end();
            return reject(err);
          }

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
              conn.end();
              if (error) return reject(new Error(error));
              resolve(output.trim());
            });
        });
      })
      .on("error", (err) => {
        console.log(err)
        reject(err);
      })
      .connect(config);
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { server, module } = body;

    if (!server || !module) {
      return NextResponse.json(
        { error: "Missing 'server' or 'module' parameter" },
        { status: 400 }
      );
    }


    const sshConfig = qas_servers[server];
    if (!sshConfig) {
      return NextResponse.json(
        { error: `Unknown server: ${server}` },
        { status: 400 }
      );
    }

    // Linux command to check the process
    const command = `systemctl status ${module}`;

    const result = await runSSHCommand(sshConfig, command);
    console.log(result)
    const status = result.includes('ative') ? "RUNNING" : "STOPPED";

    return NextResponse.json({
      server,
      module,
      status,
      pid: result,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
