import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

CONFIG_MAP = {
    'development': 'app.config.DevelopmentConfig',
    'testing': 'app.config.TestingConfig',
    'production': 'app.config.ProductionConfig',
}

def create_app():
    app = Flask(__name__)

    env = os.environ.get('FLASK_ENV', 'development')
    app.config.from_object(CONFIG_MAP.get(env, CONFIG_MAP['development']))

    cors_origins = os.environ.get('CORS_ORIGINS', '*')
    db.init_app(app)
    CORS(app, origins=cors_origins.split(','))
    
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