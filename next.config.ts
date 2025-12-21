import type { NextConfig } from "next";

const origin_ip = process.env.ORIGIN_IP_ADDRESS || "localhost";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev", origin_ip],
};

export default nextConfig;
