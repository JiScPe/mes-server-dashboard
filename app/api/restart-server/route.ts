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

function openSSH(config: SSHConfig): Promise<Client> {
  return new Promise((resolve, reject) => {
    const conn = new Client();

    conn
      .on("ready", () => resolve(conn))
      .on("error", (err) => reject(err))
      .connect(config);
  });
}

function execCommand(conn: Client, command: string): Promise<void> {
  return new Promise((resolve, reject) => {
    conn.exec(command, (err, stream) => {
      if (err) return reject(err);

      let error = "";

      stream.stderr.on("data", (data: Buffer) => {
        error += data.toString();
      });

      stream.on("close", () => {
        if (error) reject(new Error(error));
        else resolve();
      });
    });
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const server = searchParams.get("server");
  const module = searchParams.get("module");

  if (!server || !module) {
    return NextResponse.json(
      { error: "Missing server or module parameter" },
      { status: 400 }
    );
  }

  const config: SSHConfig | undefined = qas_servers[server];
  if (!config) {
    return NextResponse.json(
      { error: `Unknown server: ${server}` },
      { status: 400 }
    );
  }

  let conn: Client | null = null;

  try {
    console.log(`restarting: ${server} / ${module}`)
    conn = await openSSH(config);

    const basePath = `/home/prod/app/${module}/tomcat/bin`;

    // 1️⃣ Shutdown service
    await execCommand(
      conn,
      `cd ${basePath} && ./shutdown.sh`
    );

    // 2️⃣ Delay to allow graceful shutdown
    await sleep(10000); // 10 seconds

    // 3️⃣ Start service
    await execCommand(
      conn,
      `cd ${basePath} && ./startup.sh`
    );

    return NextResponse.json({
      server,
      module,
      status: "RESTART_TRIGGERED",
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        server,
        module,
        error: err.message || "Restart failed",
      },
      { status: 500 }
    );
  } finally {
    if (conn) conn.end();
  }
}
