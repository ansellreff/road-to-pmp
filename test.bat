@echo off
rem Double-click to run every check and click test. The app must be running (start.bat).
rem Uses the project-local Node.js, Git and Python; nothing is installed in Windows.
set "ROOT=%~dp0"
set "PATH=%ROOT%.tools\node;%ROOT%.tools\git\cmd;%PATH%"
set "npm_config_cache=%ROOT%.tools\npm-cache"
cd /d "%ROOT%"
set "PY=%ROOT%.venv\Scripts\python.exe"

"%PY%" tools\check_frozen.py || goto failed
"%PY%" tools\check_content.py || goto failed
"%PY%" tools\check_invisible.py || goto failed
"%PY%" tools\check_contrast.py || goto failed
cd /d "%ROOT%web"
call npm test || goto failed
echo.
echo Everything passed.
pause
exit /b 0

:failed
echo.
echo A check failed (see above). If it says it cannot connect, double-click start.bat first.
echo Otherwise show this window to Claude.
pause
exit /b 1
