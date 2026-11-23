@echo off
chcp 65001 >nul
rem 启动同源代理服务：托管页面，并把 /api/translate 转发给公开翻译接口（MyMemory）
rem 该接口免注册、无需密钥，免费额度约每天 1000 词
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
