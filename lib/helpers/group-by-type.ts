import { Server } from "@/types/servers";

export const SERVICE_TYPE_ORDER = [
  "NGINX",
  "REDIS",
  "MES_PRD_APP",
  "WPCL",
  "IOT",
] as const;

export function groupServersByType(servers: Server[]) {
  const map: Record<string, Server[]> = {};

  for (const type of SERVICE_TYPE_ORDER) {
    map[type] = [];
  }

  for (const server of servers) {
    // Determine server type
    // Option A: explicit server.type
    const type = server.services[0].type ?? "system";

    // Option B (fallback): derive from modules
    // const type = server.server.some(m => m.type === "nginx") ? "nginx" : "java";

    if (!map[type]) map[type] = [];
    map[type].push(server);
  }

  return map;
}