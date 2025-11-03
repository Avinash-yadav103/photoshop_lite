# 🚀 Running PhotoshopLite Project

This guide provides step-by-step instructions for setting up and running the PhotoshopLite project.

## Prerequisites Installation

### 1. Python Installation (3.8+)
```bash
python --version
```

### 2. Node.js Installation (14+) - For Frontend
```bash
node --version
npm --version
```

### 3. FFmpeg Installation (For Video Processing)
```bash
# Windows (using Chocolatey)
choco install ffmpeg

# Or download from: https://ffmpeg.org/download.html
# Add to PATH: C:\ffmpeg\bin
```

---

## 🔧 Backend Setup & Run

### 1. Clone the Repository
```bash
git clone https://github.com/Avinash-yadav103/photoshop_lite.git
cd photoshop_lite
```

### 2. Navigate to Backend Directory
```bash
cd backend
```

### 3. Create Virtual Environment
```bash
python -m venv venv
```

### 4. Activate Virtual Environment
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

### 5. Install Dependencies
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 6. Set Environment Variables
```bash
# Create .env file in backend directory
copy .env.example .env

# Edit .env file with your configurations
notepad .env
```

### 7. Initialize Database (PostgreSQL)
```bash
# Install PostgreSQL first
# Then create database
createdb photoshoplite_db

# Run migrations (if using Flask-Migrate)
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

### 8. Run Development Server
```bash
# Method 1: Using run.py
python run.py

# Method 2: Using Flask command
set FLASK_APP=app
set FLASK_ENV=development
flask run

# Method 3: With custom host and port
python run.py --host=0.0.0.0 --port=5000
```

Backend will be running at: **http://localhost:5000**

---

## 🎨 Frontend Setup & Run

### 1. Navigate to Frontend Directory
```bash
cd frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm start
```

Frontend will be running at: **http://localhost:3000**

---

## 🐳 Docker Setup (Alternative)

### Build and Run with Docker Compose
```bash
# From project root directory
docker-compose up --build

# Run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

---

## 🧪 Running Tests

### Unit Tests
```bash
cd backend
python -m pytest tests/unit

# With coverage
python -m pytest tests/unit --cov=app --cov-report=html
```

### Integration Tests
```bash
python -m pytest tests/integration
```

### Performance Tests
```bash
python -m pytest tests/performance
```

---

## 🔄 Background Tasks (Celery)

### 1. Start Redis Server
```bash
# Windows (using WSL or Redis for Windows)
redis-server

# Or using Docker
docker run -d -p 6379:6379 redis:alpine
```

### 2. Start Celery Worker
```bash
cd backend
celery -A app.tasks worker --loglevel=info

# For Windows
celery -A app.tasks worker --pool=solo --loglevel=info
```

### 3. Start Celery Beat (for Scheduled Tasks)
```bash
celery -A app.tasks beat --loglevel=info
```

---

## 📝 Environment Variables

Create a `.env` file in the backend directory with these variables:
```env
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost/photoshoplite_db
UPLOAD_FOLDER=app/uploads
MAX_CONTENT_LENGTH=16777216
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

---

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Windows - Kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### Module Not Found Errors
```bash
# Reinstall dependencies
pip install --upgrade --force-reinstall -r requirements.txt
```

### Database Connection Issues
```bash
# Check PostgreSQL service
# Windows: Open services.msc and check PostgreSQL service
# Linux: sudo systemctl status postgresql

# Test connection
psql -U postgres -h localhost
```

---

## 🎯 Quick Start (Development)

Open four terminal windows and run these commands in sequence:

```bash
# Terminal 1 - Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python run.py

# Terminal 2 - Frontend
cd frontend
npm install
npm start

# Terminal 3 - Redis
redis-server

# Terminal 4 - Celery Worker
cd backend
venv\Scripts\activate
celery -A app.tasks worker --pool=solo --loglevel=info
```

The application will be available at:
- Backend API: http://localhost:5000
- Frontend: http://localhost:3000

---

## 📚 Additional Resources

- Check `docs/` directory for detailed documentation
- API Documentation: `docs/api_documentation.md`
- Architecture Overview: `docs/architecture.md`
- User Manual: `docs/user_manual.md`

For more information or issues, please visit the [GitHub repository](https://github.com/Avinash-yadav103/photoshop_lite).
