import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";

import mimeTypes from "./mimeTypes.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env["PORT"] || 2795;

/**
 * To Serve Static Files.
 */
async function serveStaticFile(filePath: string): Promise<{ data: Buffer; type: string }> {
  const ext = path.extname(filePath);
  const type = mimeTypes[ext] || "application/octet-stream";
  const data = await fs.readFile(filePath);
  return { data, type };
}

const SWISH_PATH = path.join(__dirname, "swish"); // no leading slash

function joinSafe(base: string, rel: string) {
  // remove leading slashes from rel, resolve, and ensure it stays inside base
  const safeRel = rel.replace(/^\/+/, "");
  const resolved = path.resolve(base, safeRel);
  const baseResolved = path.resolve(base);
  if (!resolved.startsWith(baseResolved + path.sep) && resolved !== baseResolved) {
    throw new Error("Forbidden");
  }
  return resolved;
}

const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    // only allow GET/HEAD
    if (req.method && !["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
      return;
    }

    const rawUrl = req.url || "/";
    const pathname = rawUrl.split("?")[0] || "/";

    if (pathname === "/") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Channel #SR79 Active");
      return;
    }

    if (pathname.startsWith("/swish")) {
      // redirect /swish -> /swish/
      if (pathname === "/swish") {
        res.writeHead(301, { Location: "/swish/" });
        res.end();
        return;
      }

      // serve index at /swish/
      if (pathname === "/swish/") {
        try {
          const indexPath = joinSafe(SWISH_PATH, "index.html");
          const { data, type } = await serveStaticFile(indexPath);
          res.writeHead(200, { "Content-Type": type });
          res.end(data);
        } catch {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("Swish Index Not Found");
        }
        return;
      }

      // asset requests under /swish/...
      try {
        const relative = pathname.replace(/^\/swish\//, "");
        let filePath = joinSafe(SWISH_PATH, relative);
        // if a directory, serve index.html
        if (filePath.endsWith(path.sep)) filePath = path.join(filePath, "index.html");
        const { data, type } = await serveStaticFile(filePath);
        res.writeHead(200, { "Content-Type": type });
        res.end(data);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
      return;
    }

    // fallback static -- serve only from project src directory and sanitize
    try {
      const STATIC_BASE = path.join(__dirname); // or path.join(__dirname, 'public');
      const rel = pathname.replace(/^\//, "");
      const filePath = joinSafe(STATIC_BASE, rel);
      const { data, type } = await serveStaticFile(filePath);
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    } catch {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } catch (err) {
    console.log(err);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
});

server.listen(port, () => {
  console.log(`Channel SR79 Active; Port: ${port}`)
});
