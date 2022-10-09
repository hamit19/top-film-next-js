const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const connectToDatabase = require("./util/mongodb.js");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

require("dotenv").config({ path: __dirname + "/.env.local" });

app.prepare().then(async () => {
  await connectToDatabase();

  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);

    handle(req, res, parsedUrl);
  }).listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
