@echo off
echo Starting iForge Technologies local site...
start "iForge Server" /min wsl -u root -d Ubuntu -e bash -c "service mariadb start && service apache2 start && echo 'iForge local server is running! Keep this window open.' && sleep infinity"
timeout /t 3 >nul
echo Site is running at http://localhost:8080/
start http://localhost:8080/
echo.
echo ==============================================
echo   iForge Local Site is LIVE at:
echo   http://localhost:8080/
echo.
echo   WP Admin: http://localhost:8080/wp-login.php
echo   User: iforg
echo   Pass: admin123
echo ==============================================
echo.
pause
