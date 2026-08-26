import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

dotenv.config({ path: ".env" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "migrations",
  },
  datasource: {
    url: env("AUTH_DATABASE_URL"),
  },
});
