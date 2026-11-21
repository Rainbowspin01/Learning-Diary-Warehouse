@echo off
chcp 65001 >nul
rem 启动同源代理服务：托管页面，并把 /api/chat 转发给本地 Ollama
rem 使用前请确保 Ollama 已启动（http://127.0.0.1:11434）
cd /d "%~dp0.."

where node >nul 2>nul
if errorlevel 1 (
  echo [错误] 未找到 node，请先安装 Node.js 后重试。
  pause
  exit /b 1
)

start "" "http://127.0.0.1:5500/index/index.html"
echo 本地地址：http://127.0.0.1:5500/index/index.html
echo 公网访问：另开终端执行 cloudflared tunnel --url http://127.0.0.1:5500
echo 按 Ctrl+C 可停止服务。
node server.js

pause
