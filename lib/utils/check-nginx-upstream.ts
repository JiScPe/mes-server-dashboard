import { UpstreamServer } from "@/types/check-nginx-types";

export function transformUpstreamResult(
  raw: string,
  prefix: string
): UpstreamServer[] {
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map((line, index) => {
      const isUpstream = !line.startsWith('#');

      // remove '#' and 'server' keywords
      const cleaned = line
        .replace(/^#/, '')
        .replace(/^server\s+/i, '')
        .replace(';', '')
        .trim();

      const [server_ip, port] = cleaned.split(':');

      return {
        server_name: `${prefix}${index + 1}`,
        server_ip,
        running_port: Number(port),
        isUpstream,
      };
    });
}
