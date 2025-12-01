# PhotoshopLite Backend

Flask-based backend API for the PhotoshopLite image and video editing platform.

## Technologies Used

- **Flask** - Web framework
- **OpenCV** - Image/video processing
- **NumPy** - Numerical operations
- **Pillow** - Image manipulation
- **MoviePy** - Video processing
- **SQLAlchemy** - ORM
- **Celery** - Background task processing
- **Redis** - Task queue broker

## Project Structure

```
app/
├── api/                  # API endpoints (Blueprints)
│   ├── auth.py           # Authentication
│   ├── assets.py         # File management
│   ├── edits.py          # Image editing
│   └── video.py          # Video processing
├── models/               # Database models
│   ├── user.py
│   ├── project.py
│   └── asset.py
├── services/             # Core processing logic
│   ├── image_service.py
│   ├── video_service.py
│   └── filters/          # Filter implementations
│       ├── spatial_domain/
│       ├── morphological/
│       ├── frequency_domain/
│       └── ml_features/
├── tasks/                # Celery background tasks
├── utils/                # Helper utilities
├── static/               # Static files
├── templates/            # HTML templates
├── uploads/              # File uploads
├── __init__.py           # Flask app factory
└── config.py             # Configuration
```

## Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Set environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Running the Application

### Development Server
```bash
python run.py
```
Runs on http://localhost:5000

### With Gunicorn (Production)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 wsgi:app
```

### Celery Worker
```bash
celery -A app.tasks worker --loglevel=info
```

## Database Setup

### Initialize Database
```bash
flask db init
flask db migrate -m "Initial migration"
flask db upgrade
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Assets
- `POST /api/assets/upload/image` - Upload image
- `POST /api/assets/upload/video` - Upload video
- `GET /api/assets` - Get all assets
- `GET /api/assets/:id` - Get asset by ID
- `DELETE /api/assets/:id` - Delete asset

### Image Editing
- `POST /api/edits/image/:id/brightness` - Adjust brightness
- `POST /api/edits/image/:id/contrast` - Adjust contrast
- `POST /api/edits/image/:id/gaussian-blur` - Apply Gaussian blur
- `POST /api/edits/image/:id/edge-detection` - Detect edges
- `POST /api/edits/image/:id/face-detection` - Detect faces
- And more...

### Video Processing
- `POST /api/video/:id/trim` - Trim video
- `POST /api/video/:id/apply-filter` - Apply filter
- `POST /api/video/:id/extract-audio` - Extract audio
- And more...

## Environment Variables

Required variables in `.env`:
```
FLASK_APP=app
FLASK_ENV=development
SECRET_KEY=your-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dbname
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
```

## Testing

```bash
pytest tests/
```

## Docker

Build and run with Docker Compose:
```bash
docker-compose up --build
```

## License

MIT
