const express = require("express");
const multer = require("multer");
const server = express();
const next = require("next");
const connectToDatabase = require("./util/mongodb.js");
const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const { createMedia } = require("./server/controller/Media");

require("dotenv").config({ path: __dirname + "/.env.local" });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage });

app.prepare().then(async () => {
  await connectToDatabase();

  server.post("/upload", upload.array("media"), createMedia);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
