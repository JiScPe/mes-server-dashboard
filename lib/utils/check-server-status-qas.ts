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

type ServerType =
  // | "ZOOKEEPER"
  // | "DB"
  // | "MONGO"
  // | "NGINX"
  // | "REDIS"
  | "MES_QAS_APP"
  // | "WPCL"
  // | "IOT";

type StatusHandler = (appConn: Client, nginxConn?: Client) => Promise<any>;

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
  // ZOOKEEPER: async (appConn) => zooCheckStatusProcess({ appConn }),
  // DB: async (appConn) => dbCheckStatusProcess({ appConn }),
  // MONGO: async (appConn) => mongoCheckStatusProcess({ appConn }),
  // NGINX: async (appConn) => nginxCheckStatusProcess({ appConn }),
  // REDIS: async (appConn) => redisCheckStatusProcess({ appConn }),
  MES_QAS_APP: async (appConn, nginxConn) =>
    appCheckStatusProcess({ appConn, nginxConn }),
  // WPCL: async (appConn) => wpclCheckStatusProcess({ appConn }),
  // IOT: async (appConn) => iotCheckStatusProcess({ appConn }),
};

function detectServerTypes(serverName: string): ServerType[] {
  const types: ServerType[] = [];

  // if (serverName.includes("ZOO")) types.push("ZOOKEEPER");
  // if (serverName.includes("DB")) types.push("DB");
  // if (serverName.includes("MONGO")) types.push("MONGO");
  // if (serverName.includes("NGINX")) types.push("NGINX");
  // if (serverName.includes("REDIS")) types.push("REDIS");
  if (serverName.includes("MES_QAS_APP")) types.push("MES_QAS_APP");
  // if (serverName.includes("WPCL")) types.push("WPCL");
  // if (serverName.includes("IOT")) types.push("IOT");

  return types;
}

export async function checkQASServer(
  serverName: string,
  config: SSHConfig,
  nginxConfig?: SSHConfig
) {
  let conn: Client | null = null;
  let nginxConn: Client | null = null;

  try {
    conn = await openSSH(config);
    nginxConn = await openSSH(nginxConfig!);

    const types = detectServerTypes(serverName);
    const services: any[] = [];

    for (const type of types) {
      const handler = SERVER_HANDLERS[type];
      if (!handler) continue;

      const result = await handler(conn, nginxConn!);
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
    if (nginxConn) nginxConn.end();
  }
}
