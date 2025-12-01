@echo off
echo ====================================
echo PhotoshopLite - Backend Setup
echo ====================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

echo [1/6] Navigating to backend directory...
cd /d "%~dp0backend"

echo [2/6] Creating virtual environment...
if not exist "venv" (
    python -m venv venv
    echo Virtual environment created.
) else (
    echo Virtual environment already exists.
)

echo [3/6] Activating virtual environment...
call venv\Scripts\activate.bat

echo [4/6] Installing dependencies...
pip install --upgrade pip
pip install -r requirements.txt

echo [5/6] Setting up environment...
if not exist ".env" (
    copy .env.example .env
    echo .env file created. Please edit it with your configuration.
) else (
    echo .env file already exists.
)

echo [6/6] Starting backend server...
echo.
echo ====================================
echo Backend server starting...
echo Access API at: http://localhost:5000
echo Press Ctrl+C to stop
echo ====================================
echo.

python run.py

pause
