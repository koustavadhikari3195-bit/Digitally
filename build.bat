@echo off
echo ===================================================
echo      DIGITALLY - COMPLETE BUILD SCRIPT
echo ===================================================
echo.

:: Set Node.js path to local installation
set NODE_PATH=%~dp0node_bin\node-v20.11.0-win-x64
set PATH=%NODE_PATH%;%PATH%

echo [1/3] Building Frontend...
cd frontend
call "%NODE_PATH%\node.exe" node_modules\vite\bin\vite.js build
if %errorlevel% neq 0 (
    echo Frontend build failed!
    pause
    exit /b 1
)

echo.
echo [2/3] Copying build to backend...
xcopy /E /I /Y dist ..\backend\public
if %errorlevel% neq 0 (
    echo Copy failed!
    pause
    exit /b 1
)

echo.
echo [3/3] Build complete!
echo.
echo Production files are in: backend\public
echo.
echo To run in production mode, use: run_production.bat
echo.

cd ..
pause
