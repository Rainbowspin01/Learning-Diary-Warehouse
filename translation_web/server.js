const http = require("http");
const https = require("https");
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const PORT = Number(process.env.PORT) || 5500;

// 免注册的公开翻译接口：MyMemory（免费额度约每天 1000 词）
const MYMEMORY_HOST = "api.mymemory.translated.net";
const MYMEMORY_MAX_BYTES = 450;

// 页面里的语言代码 -> 接口要求的语言代码
const API_LANGS = {
  "zh-CN": "zh-CN",
  en: "en-US",
  ja: "ja-JP",
  fr: "fr-FR",
  es: "es-ES",
  de: "de-DE"
};

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

// 超过接口单次上限时按句子切成多段，避免长文本直接失败
function splitText(text, maxBytes) {
  const sentences = text.match(/[^。！？.!?\n]+[。！？.!?\n]*/g) || [text];
  const chunks = [];
  let current = "";

  function pushCurrent() {
    if (current.trim()) chunks.push(current);
    current = "";
  }

  sentences.forEach(function (sentence) {
    if (Buffer.byteLength(sentence) > maxBytes) {
      pushCurrent();
      let piece = "";
      for (const ch of sentence) {
        if (Buffer.byteLength(piece + ch) > maxBytes) {
          chunks.push(piece);
          piece = "";
        }
        piece += ch;
      }
      current = piece;
      return;
    }
    if (Buffer.byteLength(current + sentence) > maxBytes) pushCurrent();
    current += sentence;
  });
  pushCurrent();
  return chunks;
}

// 请求 MyMemory 翻译单段文本
function translateChunk(text, langpair) {
  return new Promise(function (resolve, reject) {
    const query = "?q=" + encodeURIComponent(text) + "&langpair=" + encodeURIComponent(langpair);
    const upstream = https.request({
      hostname: MYMEMORY_HOST,
      path: "/get" + query,
      method: "GET",
      headers: {
        "Accept": "application/json",
        "User-Agent": "yishu-translator/1.0"
      }
    }, function (upstreamRes) {
      let data = "";
      upstreamRes.on("data", function (chunk) { data += chunk; });
      upstreamRes.on("end", function () {
        let parsed;
        try {
          parsed = JSON.parse(data);
        } catch (e) {
          return reject(new Error("翻译服务返回格式错误"));
        }
        const result = parsed && parsed.responseData && parsed.responseData.translatedText;
        if (upstreamRes.statusCode !== 200 || parsed.responseStatus !== 200 || !result) {
          const reason = (parsed && parsed.responseDetails) || "翻译服务返回 " + upstreamRes.statusCode;
          return reject(new Error(reason));
        }
        if (/MYMEMORY WARNING/i.test(result)) {
          return reject(new Error("今日免费翻译额度已用完，请明天再试"));
        }
        resolve(result);
      });
    });

    upstream.on("error", function () {
      reject(new Error("无法连接翻译服务"));
    });
    upstream.end();
  });
}

// 接收页面发来的 {text, source, target}，由服务端调用公开翻译接口，跨域和密钥都不暴露给前端
function proxyTranslate(req, res) {
  let body = "";
  req.on("data", function (chunk) {
    body += chunk;
    if (body.length > 1024 * 1024) req.destroy();
  });
  req.on("end", function () {
    let payload;
    try {
      payload = JSON.parse(body);
    } catch (e) {
      return sendJson(res, 400, { error: "请求格式错误" });
    }

    const text = typeof payload.text === "string" ? payload.text : "";
    if (!text.trim()) return sendJson(res, 400, { error: "待翻译内容为空" });

    const sourceLang = API_LANGS[payload.source];
    const targetLang = API_LANGS[payload.target];
    if (!sourceLang || !targetLang) {
      return sendJson(res, 400, { error: "不支持的语言组合" });
    }

    const langpair = sourceLang + "|" + targetLang;
    const chunks = splitText(text, MYMEMORY_MAX_BYTES);

    chunks
      .reduce(function (chain, chunk) {
        return chain.then(function (acc) {
          return translateChunk(chunk, langpair).then(function (translated) {
            acc.push(translated);
            return acc;
          });
        });
      }, Promise.resolve([]))
      .then(function (results) {
        sendJson(res, 200, { text: results.join(" ").trim() });
      })
      .catch(function (err) {
        sendJson(res, 502, { error: err.message });
      });
  });
}

const server = http.createServer(function (req, res) {
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));

  if (url.pathname === "/api/translate") {
    if (req.method !== "POST") return sendJson(res, 405, { error: "仅支持 POST" });
    return proxyTranslate(req, res);
  }

  // 根路径重定向到页面所在目录，保证 index.html 里的相对引用（./index.css、./index.js）能被正确解析
  if (url.pathname === "/") {
    res.writeHead(302, { Location: "/index/index.html" });
    res.end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(url.pathname);
  } catch (e) {
    return sendJson(res, 400, { error: "非法路径" });
  }

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
