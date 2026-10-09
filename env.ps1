# Activates the project-local tools for the current PowerShell window only.
# Usage (from the project folder):   . .\env.ps1
# Nothing is installed in Windows; closing the window undoes it.
$root = $PSScriptRoot
$env:PATH = "$root\.tools\node;$root\.tools\git\cmd;$root\.venv\Scripts;$env:PATH"
$env:npm_config_cache = "$root\.tools\npm-cache"
Write-Host "Project tools active: node $(node --version), $(git --version)"
