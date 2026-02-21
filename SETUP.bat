@echo off
REM UpGuard Authentication Setup Script for Windows
REM This script sets up both backend and frontend

echo.
echo ^|SHIELD^| UpGuard Authentication Setup
echo ==================================
echo.

REM Check if Python is installed
echo Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed. Please install Python 3.8 or higher.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('python --version') do echo Python found: %%i
echo.

REM Check if Node.js is installed
echo Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed. Please install Node.js 16 or higher.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo Node.js found: %%i
echo.

REM Setup Backend
echo Setting up Backend...
cd backend

REM Create virtual environment
echo Creating Python virtual environment...
python -m venv venv

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install dependencies
echo Installing Python dependencies...
pip install -r requirements.txt
echo Backend dependencies installed
echo.

REM Create .env file
echo Creating .env file...
if not exist ".env" (
    copy .env.example .env
    echo .env file created ^(you may want to update JWT_SECRET_KEY^)
)
echo.

cd ..

REM Setup Frontend
echo Setting up Frontend...
cd frontend

echo Installing Node.js dependencies...
call npm install
echo Frontend dependencies installed
echo.

cd ..

echo.
echo ===================================
echo ^[SUCCESS^] Setup Complete!
echo ===================================
echo.
echo To start the application:
echo.
echo 1. Start Backend:
echo    cd backend
echo    venv\Scripts\activate.bat
echo    python app.py
echo.
echo 2. Start Frontend ^(in a new terminal^):
echo    cd frontend
echo    npm run dev
echo.
echo Access the application:
echo Frontend: http://localhost:5173
echo Backend API: http://localhost:5000
echo.
pause
