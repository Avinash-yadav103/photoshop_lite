from flask import Blueprint

api_bp = Blueprint('api', __name__)

from . import auth, assets, edits, video  # Importing the API modules to register their routes