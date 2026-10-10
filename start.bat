@echo off
rem Double-click to start the learning platform on this PC.
rem Uses the project-local Node.js in .tools; nothing is installed in Windows.
set "ROOT=%~dp0"
set "PATH=%ROOT%.tools\node;%ROOT%.tools\git\cmd;%PATH%"
set "npm_config_cache=%ROOT%.tools\npm-cache"
cd /d "%ROOT%web"
echo Starting Road to PMP at http://localhost:5173  (close this window to stop)
call npm run dev -- --open
pause
