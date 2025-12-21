import { SystemctlStatus } from "@/types/servers";
import {
  appServices,
  dbServices,
  iotServices,
  mongoServices,
  nginxServices,
  redisServices,
  wpclServices,
  zooServices,
} from "./services-list";
import { Client } from "ssh2";

type Props = {
  conn: Client;
};

/**
 * Execute command using an EXISTING SSH connection
 */
function execGrepCommand(conn: Client, command: string): Promise<string> {
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

function execSystemctlCommand(
  conn: Client,
  service: string
): Promise<SystemctlStatus> {
  return new Promise((resolve, reject) => {
    const cmd = `systemctl show ${service} --property=ActiveState,MainPID`;

    conn.exec(cmd, (err, stream) => {
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
          if (error) return reject(new Error(error));

          const activeMatch = output.match(/ActiveState=(\w+)/);
          const pidMatch = output.match(/MainPID=(\d+)/);

          resolve({
            active: activeMatch?.[1] === "active",
            pid: pidMatch?.[1] || null,
          });
        });
    });
  });
}

// zoo check status process
export async function zooCheckStatusProcess({ conn }: Props) {
  const results: any[] = [];
  for (const service of zooServices) {
    try {
      const { active, pid } = await execSystemctlCommand(conn, service);

      results.push({
        service,
        status: active ? "RUNNING" : "STOPPED",
        pid,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}
// db check status process
export async function dbCheckStatusProcess({ conn }: Props) {
  const results: any[] = [];

  for (const service of dbServices) {
    try {
      const { active, pid } = await execSystemctlCommand(conn, service);

      results.push({
        service,
        status: active ? "RUNNING" : "STOPPED",
        pid,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}
// mongo check status process
export async function mongoCheckStatusProcess({ conn }: Props) {
  const results: any[] = [];

  for (const service of mongoServices) {
    try {
      const { active, pid } = await execSystemctlCommand(conn, service);

      results.push({
        service,
        status: active ? "RUNNING" : "STOPPED",
        pid,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}

// nginx check status process
export async function nginxCheckStatusProcess({ conn }: Props) {
  const results: any[] = [];

  for (const service of nginxServices) {
    try {
      // systemd-managed service
      if (service === "keepalived") {
        const { active, pid } = await execSystemctlCommand(conn, service);

        results.push({
          service,
          status: active ? "RUNNING" : "STOPPED",
          pid,
        });
        continue;
      }

      // normal process
      const cmd = `pgrep -o -f ${service}`;
      const pid = await execGrepCommand(conn, cmd);

      results.push({
        service,
        status: pid ? "RUNNING" : "STOPPED",
        pid: pid || null,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}

// redis check status process
export async function redisCheckStatusProcess({ conn }: Props) {
  const results: any[] = []; // ✅ local, isolated

  for (const service of redisServices) {
    try {
      const cmd = `pgrep -o -f ${service}`;
      const pid = await execGrepCommand(conn, cmd);

      results.push({
        service,
        status: pid ? "RUNNING" : "STOPPED",
        pid: pid || null,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}

// app check status process
export async function appCheckStatusProcess({ conn }: Props) {
  const results: any[] = []; // ✅ local, isolated

  for (const service of appServices) {
    try {
      const cmd = `pgrep -o -f ${service}`;
      const pid = await execGrepCommand(conn, cmd);

      results.push({
        service,
        status: pid ? "RUNNING" : "STOPPED",
        pid: pid || null,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}

// wpcl check status process
export async function wpclCheckStatusProcess({ conn }: Props) {
  const results: any[] = []; // ✅ local, isolated

  for (const service of wpclServices) {
    try {
      const cmd = `pgrep -o -f ${service}`;
      const pid = await execGrepCommand(conn, cmd);

      results.push({
        service,
        status: pid ? "RUNNING" : "STOPPED",
        pid: pid || null,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}

// iot check status process
export async function iotCheckStatusProcess({ conn }: Props) {
  const results: any[] = []; // ✅ local, isolated

  for (const service of iotServices) {
    try {
      const cmd = `pgrep -f ${service}`;
      const pid = await execGrepCommand(conn, cmd);

      results.push({
        service,
        status: pid ? "RUNNING" : "STOPPED",
        pid: pid || null,
      });
    } catch {
      results.push({
        service,
        status: "STOPPED",
        pid: null,
      });
    }
  }

  return results;
}
