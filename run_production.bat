@echo off
echo ===================================================
echo      DIGITALLY - PRODUCTION SERVER
echo ===================================================
echo.

:: Set Node.js path to local installation
set NODE_PATH=%~dp0node_bin\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

:: Verify Node.js is available
"%NODE_PATH%\node.exe" --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js not found in node_bin folder.
    pause
    exit /b 1
)

echo [INFO] Using local Node.js installation
"%NODE_PATH%\node.exe" --version
echo.

:: Check if production build exists
if not exist "backend\public\index.html" (
    echo [WARNING] Production build not found!
    echo Building frontend...
    echo.
    cd frontend
    call "%NODE_PATH%\node.exe" node_modules\vite\bin\vite.js build
    if %errorlevel% neq 0 (
        echo Build failed!
        pause
        exit /b 1
    )
    
    echo Copying build to backend...
    xcopy /E /I /Y dist ..\backend\public
    cd ..
)

echo.
echo [PRODUCTION] Starting server...
echo.
echo Server will run on: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

cd backend
set NODE_ENV=production
"%NODE_PATH%\node.exe" server.js

pause
