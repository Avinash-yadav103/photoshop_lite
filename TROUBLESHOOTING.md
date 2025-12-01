# Troubleshooting Guide - PhotoshopLite

## Docker Issues

### Issue: Docker Desktop Not Running
**Error Message:**
```
unable to get image: error during connect: open //./pipe/dockerDesktopLinuxEngine: The system cannot find the file specified.
```

**Solutions:**
1. **Start Docker Desktop:**
   - Open Docker Desktop application from Start menu
   - Wait for the whale icon in system tray to stop animating
   - Try again: `docker-compose up --build`

2. **If Docker Desktop won't start:**
   - Restart your computer
   - Run Docker Desktop as Administrator
   - Check Windows features: Enable "Hyper-V" and "Windows Subsystem for Linux"

3. **Alternative: Run without Docker**
   - Use the batch scripts: Double-click `start-all.bat`
   - Or follow QUICKSTART.md for manual setup

### Issue: Version Warning
**Warning Message:**
```
the attribute `version` is obsolete
```

**Solution:** This is just a warning and can be ignored. The version has been removed from docker-compose.yml.

---

## Backend Issues

### Issue: Module Not Found
**Error:**
```
ModuleNotFoundError: No module named 'flask'
```

**Solutions:**
```powershell
# Make sure virtual environment is activated
cd backend
venv\Scripts\activate

# Reinstall dependencies
pip install --upgrade pip
pip install -r requirements.txt
```

### Issue: Port 5000 Already in Use
**Error:**
```
Address already in use
```

**Solutions:**
```powershell
# Find what's using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual number)
taskkill /PID <PID> /F

# Or use a different port in run.py
# Edit backend/run.py: app.run(port=5001)
```

### Issue: Database Connection Error
**Error:**
```
Could not connect to database
```

**Solutions:**
1. **Use SQLite for development:**
   ```env
   # In backend/.env
   DATABASE_URL=sqlite:///photoshoplite.db
   ```

2. **If using PostgreSQL:**
   - Check PostgreSQL is running: `pg_isready`
   - Verify credentials in .env match your PostgreSQL setup
   - Create database: `createdb photoshoplite_db`

### Issue: Upload Folder Permission Error
**Error:**
```
Permission denied: 'app/uploads'
```

**Solution:**
```powershell
# Create uploads directory
cd backend\app
mkdir uploads
```

---

## Frontend Issues

### Issue: Dependencies Not Installed
**Error:**
```
Cannot find module 'react'
```

**Solutions:**
```powershell
cd frontend

# Delete and reinstall
rm -r -fo node_modules
rm package-lock.json
npm install
```

### Issue: Port 3000 Already in Use
**Error:**
```
Port 3000 is already in use
```

**Solutions:**
```powershell
# Option 1: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Option 2: Use different port
# When prompted, type 'Y' to run on different port
```

### Issue: API Connection Failed
**Error in browser console:**
```
Network Error / Failed to fetch
```

**Solutions:**
1. **Check backend is running:**
   - Visit http://localhost:5000
   - Should see some response (not "cannot connect")

2. **Check .env file:**
   ```env
   # In frontend/.env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

3. **Restart both servers**

### Issue: Blank Page / White Screen
**Solutions:**
1. **Check browser console (F12)**
   - Look for JavaScript errors
   
2. **Clear browser cache:**
   - Ctrl + Shift + Delete
   - Clear cached images and files

3. **Rebuild:**
   ```powershell
   cd frontend
   npm run build
   npm start
   ```

---

## Common Runtime Errors

### Issue: CORS Error
**Error in browser:**
```
Access to fetch blocked by CORS policy
```

**Solutions:**
1. **Check backend .env:**
   ```env
   CORS_ORIGINS=http://localhost:3000
   ```

2. **Restart backend server**

### Issue: File Upload Fails
**Error:**
```
413 Request Entity Too Large
```

**Solution:**
```env
# In backend/.env - increase max size
MAX_CONTENT_LENGTH=104857600  # 100MB
```

### Issue: Filter Processing Slow
**This is normal for:**
- Large images (>5MB)
- Video processing
- ML features (face detection, SIFT)

**Solutions:**
- Use smaller images for testing
- Implement Celery for background processing
- Check CPU usage

---

## Python Issues

### Issue: Python Not Found
**Error:**
```
'python' is not recognized
```

**Solutions:**
1. **Install Python 3.8+:**
   - Download from https://python.org
   - Check "Add Python to PATH" during installation

2. **Try alternative command:**
   ```powershell
   py --version
   # Use 'py' instead of 'python' in commands
   ```

### Issue: Virtual Environment Activation Fails
**Error:**
```
Activate.ps1 is not digitally signed
```

**Solution:**
```powershell
# Run as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use cmd instead of PowerShell
cmd
cd backend
venv\Scripts\activate.bat
```

---

## Node.js Issues

### Issue: npm Command Not Found
**Solutions:**
1. **Install Node.js:**
   - Download from https://nodejs.org
   - Restart terminal after installation

2. **Verify installation:**
   ```powershell
   node --version
   npm --version
   ```

### Issue: npm install Fails
**Error:**
```
EACCES permission denied
```

**Solutions:**
```powershell
# Clear npm cache
npm cache clean --force

# Install with legacy peer deps
npm install --legacy-peer-deps

# Run as Administrator
```

---

## Quick Fixes

### Reset Everything
```powershell
# Backend
cd backend
rm -r -fo venv
rm -r -fo __pycache__
rm .env

# Frontend
cd frontend
rm -r -fo node_modules
rm package-lock.json
rm .env

# Start fresh
# Follow QUICKSTART.md
```

### Check All Services
```powershell
# Check Python
python --version

# Check Node.js
node --version

# Check npm
npm --version

# Check pip
pip --version

# Check Docker (if using)
docker --version

# Check PostgreSQL (if using)
psql --version

# Check Redis (if using)
redis-cli --version
```

---

## Still Having Issues?

1. **Check the logs:**
   - Backend terminal for error messages
   - Frontend terminal for build errors
   - Browser console (F12) for JavaScript errors

2. **Read the error message carefully:**
   - Most errors tell you exactly what's wrong
   - Google the error message

3. **Use simplified setup:**
   - Run frontend only to check UI
   - Use SQLite instead of PostgreSQL
   - Skip Celery/Redis for basic testing

4. **Create an issue:**
   - Go to GitHub repository
   - Describe the problem
   - Include error messages and screenshots

---

## Contact & Support

- GitHub: https://github.com/Avinash-yadav103/photoshop_lite
- Check README.md for more information
- See QUICKSTART.md for setup instructions
