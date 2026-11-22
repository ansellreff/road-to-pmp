@echo off
rem Double-click to make a release: every check, then the version is marked in git.
rem Claude normally runs this itself. Uploading is still done with upload.bat.
set "ROOT=%~dp0"
cd /d "%ROOT%"
"%ROOT%.venv\Scripts\python.exe" tools\release.py
pause
