from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object('app.config.Config')

    # Register blueprints
    from app.api import auth, assets, edits, video
    app.register_blueprint(auth.bp)
    app.register_blueprint(assets.bp)
    app.register_blueprint(edits.bp)
    app.register_blueprint(video.bp)

    return app