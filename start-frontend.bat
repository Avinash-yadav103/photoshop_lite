@echo off
echo ====================================
echo PhotoshopLite - Frontend Setup
echo ====================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Navigating to frontend directory...
cd /d "%~dp0frontend"

echo [2/5] Installing dependencies...
call npm install

echo [3/5] Setting up environment...
if not exist ".env" (
    copy .env.example .env
    echo .env file created.
) else (
    echo .env file already exists.
)

echo [4/5] Building frontend...
echo.
echo ====================================
echo Frontend server starting...
echo Access app at: http://localhost:3000
echo Press Ctrl+C to stop
echo ====================================
echo.

echo [5/5] Starting development server...
call npm start

pause
