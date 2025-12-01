# Quick Start Guide - PhotoshopLite

## Prerequisites

Before running the project, ensure you have:
- ✅ Python 3.8+ installed
- ✅ Node.js 14+ and npm installed
- ✅ PostgreSQL installed (optional - can use SQLite for development)
- ✅ Redis installed (optional - for background tasks)

## Option 1: Run with Docker (Recommended)

### Step 1: Start Docker Desktop
1. Open Docker Desktop application on Windows
2. Wait for Docker to start (whale icon in system tray should be stable)
3. Verify Docker is running:
```powershell
docker --version
docker-compose --version
```

### Step 2: Build and Run
```powershell
docker-compose up --build
```

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## Option 2: Run Locally (Without Docker)

### Step 1: Setup Backend

```powershell
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt

# Create .env file
copy .env.example .env

# For development, use SQLite (no PostgreSQL needed)
# Edit .env and set: DATABASE_URL=sqlite:///photoshoplite.db

# Initialize database (if using Flask-Migrate)
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Start backend server
python run.py
```

Backend will run on: **http://localhost:5000**

### Step 2: Setup Frontend (New Terminal)

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file
copy .env.example .env

# Start development server
npm start
```

Frontend will run on: **http://localhost:3000**

### Step 3: Optional - Start Celery (For background tasks)

Only needed for video processing and background tasks.

**Terminal 3 - Redis:**
```powershell
# If you have Redis installed
redis-server

# OR use Docker for Redis only
docker run -d -p 6379:6379 redis:alpine
```

**Terminal 4 - Celery Worker:**
```powershell
cd backend
venv\Scripts\activate
celery -A app.tasks worker --pool=solo --loglevel=info
```

---

## Option 3: Frontend Only (Mock Backend)

If you just want to see the frontend UI:

```powershell
cd frontend
npm install
npm start
```

**Note:** API calls will fail, but you can explore the UI.

---

## Simplified Development Setup (Recommended for Testing)

### Backend with SQLite (No PostgreSQL needed)

1. **Create `.env` in backend folder:**
```env
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=dev-secret-key-for-testing
DATABASE_URL=sqlite:///photoshoplite.db
UPLOAD_FOLDER=app/uploads
MAX_CONTENT_LENGTH=104857600
```

2. **Run backend:**
```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py
```

### Frontend

1. **Create `.env` in frontend folder:**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

2. **Run frontend:**
```powershell
cd frontend
npm install
npm start
```

---

## Troubleshooting

### Docker Issues

**Error: "Docker Desktop is not running"**
- Solution: Start Docker Desktop application
- Verify: `docker ps` should work without errors

**Error: "version is obsolete"**
- This is just a warning, can be ignored
- Or remove `version: '3.8'` line from docker-compose.yml

### Backend Issues

**Import errors:**
```powershell
pip install --upgrade --force-reinstall -r requirements.txt
```

**Database errors:**
- Use SQLite for development: `DATABASE_URL=sqlite:///photoshoplite.db`
- Check PostgreSQL is running: `psql -U postgres`

**Port already in use:**
```powershell
# Find process on port 5000
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### Frontend Issues

**Module not found:**
```powershell
rm -rf node_modules
rm package-lock.json
npm install
```

**Port already in use:**
```powershell
# Find process on port 3000
netstat -ano | findstr :3000

# Kill process
taskkill /PID <PID> /F
```

---

## Testing the Application

Once both servers are running:

1. Open browser: http://localhost:3000
2. Click "Image Editor" tab
3. Click "Choose File" and select an image
4. Click "Upload"
5. Try applying filters from the sidebar
6. Use Download/Reset buttons

---

## Development Workflow

### Making Changes

**Frontend changes:**
- Edit files in `frontend/src/`
- Changes auto-reload in browser

**Backend changes:**
- Edit files in `backend/app/`
- Restart backend server: Ctrl+C, then `python run.py`

### Running Tests

```powershell
# Backend tests
cd backend
pytest tests/

# Frontend tests
cd frontend
npm test
```

---

## Quick Command Reference

```powershell
# Start everything (separate terminals)

# Terminal 1 - Backend
cd backend
venv\Scripts\activate
python run.py

# Terminal 2 - Frontend
cd frontend
npm start

# Terminal 3 - Redis (optional)
redis-server

# Terminal 4 - Celery (optional)
cd backend
venv\Scripts\activate
celery -A app.tasks worker --pool=solo --loglevel=info
```

---

## What to Do Next

1. ✅ Start backend server
2. ✅ Start frontend server
3. ✅ Open http://localhost:3000
4. ✅ Upload an image
5. ✅ Try different filters
6. ✅ Check the code and customize!

**Happy Coding! 🎨**
