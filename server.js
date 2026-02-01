const path = require("path");
const { createServer } = require("http");
const next = require("next");
const dotenv = require("dotenv");

/**
 * 1. Resolve environment
 */
const NODE_ENV = process.env.NODE_ENV || "development";
const isProd = NODE_ENV === "production";

/**
 * 2. Load environment variables ONCE
 *    (before Next.js is initialized)
 */
const envFile = isProd ? ".env.production.local" : ".env.local";

const result = dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});

const authPass = process.env.AUTH_PASSWORD

console.log("NODE_ENV:", NODE_ENV);
console.log("ENV FILE USED:", envFile);
console.log("AUTH PASSWORD:", authPass ? "DEFINED" : "NOT DEFINED");
console.log(
  "DOTENV STATUS:",
  result.error ? result.error.message : "LOADED"
);

/**
 * 3. App config
 */
const port = process.env.PORT || 3000;

const app = next({
  dev: !isProd,
  hostname: "localhost",
  port,
});

const handle = app.getRequestHandler();

/**
 * 4. Start server
 */
app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
