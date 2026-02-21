#!/bin/bash

# UpGuard Authentication Setup Script
# This script sets up both backend and frontend

echo "🛡️  UpGuard Authentication Setup"
echo "=================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Python is installed
echo -e "${YELLOW}Checking Python installation...${NC}"
if ! command -v python &> /dev/null; then
    echo -e "${RED}Python is not installed. Please install Python 3.8 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}Python found: $(python --version)${NC}"

# Check if Node.js is installed
echo -e "${YELLOW}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}Node.js is not installed. Please install Node.js 16 or higher.${NC}"
    exit 1
fi
echo -e "${GREEN}Node.js found: $(node --version)${NC}"

# Setup Backend
echo -e "\n${YELLOW}Setting up Backend...${NC}"
cd backend

# Create virtual environment
echo "Creating Python virtual environment..."
python -m venv venv

# Activate virtual environment
if [ -f "venv/Scripts/activate" ]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt
echo -e "${GREEN}Backend dependencies installed${NC}"

# Create .env file
echo "Creating .env file..."
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}.env file created (you may want to update JWT_SECRET_KEY)${NC}"
fi

cd ..

# Setup Frontend
echo -e "\n${YELLOW}Setting up Frontend...${NC}"
cd frontend

echo "Installing Node.js dependencies..."
npm install
echo -e "${GREEN}Frontend dependencies installed${NC}"

cd ..

echo -e "\n${GREEN}✅ Setup Complete!${NC}"
echo -e "\n${YELLOW}To start the application:${NC}"
echo -e "\n1. ${GREEN}Start Backend:${NC}"
echo "   cd backend"
echo "   # Activate virtual environment if not already activated"
echo "   python app.py"
echo ""
echo -e "2. ${GREEN}Start Frontend (in a new terminal):${NC}"
echo "   cd frontend"
echo "   npm run dev"
echo -e "\n${YELLOW}Access the application:${NC}"
echo "Frontend: http://localhost:5173"
echo "Backend API: http://localhost:5000"
