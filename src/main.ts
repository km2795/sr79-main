import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";

dotenv.config();

const port = process.env["PORT"] || 2795;

const server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end("Channel SR79 Active");
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end("Page Not Found");
  }
});

server.listen(port, () => {
  console.log(`Channel SR79 Active; Port: ${port}`)
});
