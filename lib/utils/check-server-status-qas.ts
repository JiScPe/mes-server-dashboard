import { SSHConfig } from "@/types/servers";
import { Client } from "ssh2";
import {
  appCheckStatusProcess,
  dbCheckStatusProcess,
  iotCheckStatusProcess,
  mongoCheckStatusProcess,
  nginxCheckStatusProcess,
  redisCheckStatusProcess,
  wpclCheckStatusProcess,
  zooCheckStatusProcess,
} from "./ssh-commands";

type ServerType = "MES_QAS_APP";

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
  // ZOOKEEPER: async (conn) => zooCheckStatusProcess({ conn }),
  // DB: async (conn) => dbCheckStatusProcess({ conn }),
  // MONGO: async (conn) => mongoCheckStatusProcess({ conn }),
  // NGINX: async (conn) => nginxCheckStatusProcess({ conn }),
  // REDIS: async (conn) => redisCheckStatusProcess({ conn }),
  MES_QAS_APP: async (conn) => appCheckStatusProcess({ conn }),
  // WPCL: async (conn) => wpclCheckStatusProcess({ conn }),
  // IOT: async (conn) => iotCheckStatusProcess({ conn }),
};

function detectServerTypes(serverName: string): ServerType[] {
  const types: ServerType[] = [];

  if (serverName.includes("MES_QAS_APP")) types.push("MES_QAS_APP");

  return types;
}

export async function checkQASServer(serverName: string, config: SSHConfig) {
  let conn: Client | null = null;

  try {
    conn = await openSSH(config);

    const types = detectServerTypes(serverName);
    const services: any[] = [];

    for (const type of types) {
      const handler = SERVER_HANDLERS[type];
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
