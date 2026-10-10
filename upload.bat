@echo off
rem Double-click to upload the project to its private GitHub repository.
rem The website on Vercel rebuilds itself from that repository a minute later.
rem Uses the project-local Git and Python; nothing is installed in Windows.
set "ROOT=%~dp0"
set "PATH=%ROOT%.tools\git\cmd;%PATH%"
cd /d "%ROOT%"

echo Checking that nothing private or copyrighted would be uploaded...
"%ROOT%.venv\Scripts\python.exe" tools\check_publish.py
if errorlevel 1 (
  echo.
  echo The check failed, so nothing was uploaded. Show this window to Claude.
  pause
  exit /b 1
)

echo.
echo Uploading to GitHub. The first time, a GitHub sign-in window opens: approve it.
git push -u origin main
if errorlevel 1 (
  echo.
  echo The upload did not finish. Show this window to Claude.
) else (
  echo.
  echo Uploaded.
)
pause
