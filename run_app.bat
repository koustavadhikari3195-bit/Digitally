@echo off
echo ===================================================
echo      AI RESUME SAAS - ONE CLICK LAUNCHER
echo ===================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not recognized.
    echo.
    echo I have already installed it for you, but you may need to 
    echo RESTART your computer or close this terminal and open a new one
    echo for the changes to take effect.
    echo.
    echo If you just installed it, please restart your PC.
    echo.
    pause
    exit
)

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Backend install failed.
    pause
    exit
)

echo [2/3] Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Frontend install failed.
    pause
    exit
)

echo [3/3] Starting Application...
echo.
echo Opening http://localhost:5173 ...
echo.

:: Run Backend and Frontend concurrently
cd ..
start "Backend Server" cmd /k "cd backend && npm run dev"
start "Frontend Client" cmd /k "cd frontend && npm run dev"

echo Done! The app is running in new windows.
pause
