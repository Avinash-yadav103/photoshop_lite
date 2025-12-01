from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object('app.config.DevelopmentConfig')
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Health check route
    @app.route('/')
    def health_check():
        return {'status': 'ok', 'message': 'PhotoshopLite API is running'}, 200

    # Register blueprints
    from app.api import auth, assets, edits, video
    app.register_blueprint(auth.auth_bp, url_prefix='/api/auth')
    app.register_blueprint(assets.assets_bp, url_prefix='/api/assets')
    app.register_blueprint(edits.edits_bp, url_prefix='/api/edits')
    app.register_blueprint(video.video_bp, url_prefix='/api/video')
    
    # Create tables
    with app.app_context():
        db.create_all()

    return app