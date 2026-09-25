@echo off
echo ====================================================
echo   Building and Starting iForge in Docker...
echo ====================================================
echo.
docker compose up -d --build
echo.
echo ====================================================
echo   iForge Web App is running in Docker:
echo   http://localhost:3000/
echo ====================================================
echo.
pause
