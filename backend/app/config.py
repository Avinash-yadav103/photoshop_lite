class Config:
    """Base configuration."""
    SECRET_KEY = 'your_secret_key'
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = 'uploads/'
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit


class DevelopmentConfig(Config):
    """Development configuration."""
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/dev_db'


class TestingConfig(Config):
    """Testing configuration."""
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/test_db'


class ProductionConfig(Config):
    """Production configuration."""
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/prod_db'