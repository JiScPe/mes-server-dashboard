const path = require("path");
const dotenv = require("dotenv");
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";
const envFile =
  NODE_ENV === "production"
    ? ".env.production"
    : ".env.local";

const app = next({ NODE_ENV });
const handle = app.getRequestHandler();

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.local",
});

const result = dotenv.config({
  path: path.resolve(process.cwd(), envFile),
});


console.log("ENV FILE USED:", envFile);
console.log("DOTENV RESULT:", result.parsed ? "LOADED" : result.error);

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  }).listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
