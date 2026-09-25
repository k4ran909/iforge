@echo off
echo Starting iForge React & Next.js Modern App...
cd /d "%~dp0iforge-web"
start http://localhost:3000/
echo.
echo ==============================================
echo   Next.js App is running at:
echo   http://localhost:3000/
echo ==============================================
echo.
npm run dev -- -p 3000
