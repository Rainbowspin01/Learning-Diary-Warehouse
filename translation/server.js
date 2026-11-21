const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5500;
const OLLAMA_API = "http://127.0.0.1:11434/api/chat";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2"
};

function sendJson(res, status, data) {
  res.writeHead(status, { "Content-Type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(data));
}

// 把 /api/chat 原样转发给本机 Ollama，页面与接口同源，避免 CORS 和混合内容问题
function proxyChat(req, res) {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk;
    if (body.length > 1024 * 1024) req.destroy();
  });
  req.on("end", function () {
    const upstream = http.request(OLLAMA_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body)
      }
    }, function (upstreamRes) {
      res.writeHead(upstreamRes.statusCode || 502, {
        "Content-Type": upstreamRes.headers["content-type"] || "application/json; charset=utf-8"
      });
      upstreamRes.pipe(res);
    });
    upstream.on("error", function () {
      sendJson(res, 502, { error: "无法连接本地 Ollama，请确认 ollama 已启动" });
    });
    upstream.end(body);
  });
}

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));

  if (url.pathname === "/api/chat") {
    if (req.method !== "POST") return sendJson(res, 405, { error: "仅支持 POST" });
    return proxyChat(req, res);
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch (e) {
    return sendJson(res, 400, { error: "非法路径" });
  }
  if (pathname === "/") pathname = "/index/index.html";

  const filePath = path.resolve(ROOT, "." + pathname);
  if (filePath !== ROOT && !filePath.startsWith(ROOT + path.sep)) {
    return sendJson(res, 403, { error: "禁止访问" });
  }

  fs.readFile(filePath, function (err, data) {
    if (err) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("404 Not Found");
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(filePath).toLowerCase()] || "application/octet-stream"
    });
    res.end(data);
  });
});

server.listen(PORT, function () {
  console.log("页面地址：http://127.0.0.1:" + PORT + "/index/index.html");
  console.log("公网访问：另开终端执行 cloudflared tunnel --url http://127.0.0.1:" + PORT);
});
