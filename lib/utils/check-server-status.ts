import { SSHConfig } from "@/types/servers";
import { Client } from "ssh2";
import {
  appCheckStatusProcess,
  iotCheckStatusProcess,
  nginxCheckStatusProcess,
  redisCheckStatusProcess,
  wpclCheckStatusProcess,
} from "./ssh-commands";

type ServerType = "NGINX" | "REDIS" | "MES_PRD_APP" | "WPCL" | "IOT";

type StatusHandler = (conn: Client) => Promise<any>;

/** * Open ONE SSH connection per server */ function openSSH(
  config: SSHConfig
): Promise<Client> {
  return new Promise((resolve, reject) => {
    const conn = new Client();
    conn
      .on("ready", () => resolve(conn))
      .on("error", (err) => reject(err))
      .connect(config);
  });
}

const SERVER_HANDLERS: Record<ServerType, StatusHandler> = {
  NGINX: async (conn) => nginxCheckStatusProcess({ conn }),
  REDIS: async (conn) => redisCheckStatusProcess({ conn }),
  MES_PRD_APP: async (conn) => appCheckStatusProcess({ conn }),
  WPCL: async (conn) => wpclCheckStatusProcess({ conn }),
  IOT: async (conn) => iotCheckStatusProcess({ conn }),
};

function detectServerTypes(serverName: string): ServerType[] {
  const types: ServerType[] = [];

  if (serverName.includes("NGINX")) types.push("NGINX");
  if (serverName.includes("REDIS")) types.push("REDIS");
  if (serverName.includes("MES_PRD_APP")) types.push("MES_PRD_APP");
  if (serverName.includes("WPCL")) types.push("WPCL");
  if (serverName.includes("IOT")) types.push("IOT");

  return types;
}

export async function checkServer(serverName: string, config: SSHConfig) {
  let conn: Client | null = null;

  try {
    conn = await openSSH(config);

    const types = detectServerTypes(serverName);
    const services: any[] = [];

    for (const type of types) {
      const handler = SERVER_HANDLERS[type];
      console.log(handler)
      if (!handler) continue;

      const result = await handler(conn);
      services.push({
        type,
        result,
      });
    }

    return {
      server: serverName,
      status: "ONLINE",
      services,
    };
  } catch (err: any) {
    return {
      server: serverName,
      status: "OFFLINE",
      error: err.message || "SSH connection failed",
      services: [],
    };
  } finally {
    if (conn) conn.end();
  }
}
