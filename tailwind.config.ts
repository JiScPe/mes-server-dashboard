import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "service-nginx": "var(--service-nginx)",
        "service-redis": "var(--service-redis)",
        "service-appserv": "var(--service-appserv)",
        "service-wpcl": "var(--service-wpcl)",
        "service-iot": "var(--service-iot)",
      },
    },
  },
  plugins: [],
};

export default config;
