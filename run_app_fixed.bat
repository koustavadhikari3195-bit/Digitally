@echo off
echo ===================================================
echo      AI RESUME SAAS - ONE CLICK LAUNCHER
echo ===================================================
echo.

:: Set Node.js path to local installation
set NODE_PATH=%~dp0node_bin\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

:: Verify Node.js is available
"%NODE_PATH%\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found in node_bin folder.
    echo Please ensure node_bin\node-v20.11.0-win-x64 exists.
    pause
    exit /b 1
)

echo [INFO] Using local Node.js installation
"%NODE_PATH%\node.exe" --version

echo.
echo [1/3] Installing Backend Dependencies...
cd backend
call "%NODE_PATH%\npm.cmd" install
if %errorlevel% neq 0 (
    echo Backend install failed.
    pause
    exit /b 1
)

echo.
echo [2/3] Installing Frontend Dependencies...
cd ..\frontend
call "%NODE_PATH%\npm.cmd" install
if %errorlevel% neq 0 (
    echo Frontend install failed.
    pause
    exit /b 1
)

echo.
echo [3/3] Starting Application...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:5173
echo.

:: Run Backend and Frontend concurrently
cd ..
start "Backend Server" cmd /k "set PATH=%NODE_PATH%;%%PATH%% && cd backend && "%NODE_PATH%\npm.cmd" run dev"
timeout /t 2 /nobreak >nul
start "Frontend Client" cmd /k "set PATH=%NODE_PATH%;%%PATH%% && cd frontend && "%NODE_PATH%\npm.cmd" run dev"

echo.
echo Done! The app is running in new windows.
echo.
echo Press any key to close this window...
pause >nul
