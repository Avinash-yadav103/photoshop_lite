from flask import current_app
import os
from werkzeug.utils import secure_filename

class Storage:
    def __init__(self, upload_folder=None):
        self.upload_folder = upload_folder or current_app.config['UPLOAD_FOLDER']
        os.makedirs(self.upload_folder, exist_ok=True)

    def save_file(self, file):
        if file and self.allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(self.upload_folder, filename)
            file.save(file_path)
            return file_path
        return None

    def allowed_file(self, filename):
        allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'mp4', 'avi', 'mkv'}
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions

    def delete_file(self, filename):
        file_path = os.path.join(self.upload_folder, filename)
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False

    def list_files(self):
        return os.listdir(self.upload_folder)