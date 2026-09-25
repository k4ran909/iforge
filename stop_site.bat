@echo off
echo Stopping iForge Technologies local site...
wsl -u root -d Ubuntu -e bash -c "service apache2 stop && service mariadb stop"
echo Site services stopped.
pause
