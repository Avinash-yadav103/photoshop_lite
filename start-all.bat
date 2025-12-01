@echo off
echo ====================================
echo PhotoshopLite - Complete Setup
echo ====================================
echo.
echo This will start both backend and frontend servers.
echo Make sure you have Python and Node.js installed.
echo.
echo Starting in 3 seconds...
timeout /t 3 >nul

REM Start backend in new window
echo Starting backend server...
start "PhotoshopLite Backend" cmd /k "%~dp0start-backend.bat"

REM Wait a bit for backend to initialize
timeout /t 5 >nul

REM Start frontend in new window
echo Starting frontend server...
start "PhotoshopLite Frontend" cmd /k "%~dp0start-frontend.bat"

echo.
echo ====================================
echo Both servers are starting...
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Close this window or press any key...
echo ====================================
pause >nul
