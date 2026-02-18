import type { NextConfig } from "next";

const origin_ip = process.env.ORIGIN_IP_ADDRESS || "localhost";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", origin_ip],
};

export default nextConfig;
