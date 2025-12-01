from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
from datetime import datetime

assets_bp = Blueprint('assets', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'uploads')
ALLOWED_IMAGE_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'}
ALLOWED_VIDEO_EXTENSIONS = {'mp4', 'avi', 'mkv', 'mov', 'webm'}

# Create uploads directory if it doesn't exist
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename, file_type='image'):
    if '.' not in filename:
        return False
    ext = filename.rsplit('.', 1)[1].lower()
    if file_type == 'image':
        return ext in ALLOWED_IMAGE_EXTENSIONS
    elif file_type == 'video':
        return ext in ALLOWED_VIDEO_EXTENSIONS
    return False

@assets_bp.route('/upload/image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400
    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename, 'image'):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({
            'id': timestamp,
            'filename': filename,
            'filepath': filepath,
            'message': 'Image uploaded successfully'
        }), 201
    return jsonify({'error': 'File type not allowed'}), 400

@assets_bp.route('/upload/video', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        return jsonify({'error': 'No video file provided'}), 400
    file = request.files['video']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename, 'video'):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        filepath = os.path.join(UPLOAD_FOLDER, filename)
        file.save(filepath)
        return jsonify({
            'id': timestamp,
            'filename': filename,
            'filepath': filepath,
            'message': 'Video uploaded successfully'
        }), 201
    return jsonify({'error': 'File type not allowed'}), 400

@assets_bp.route('', methods=['GET'])
def list_assets():
    try:
        files = os.listdir(UPLOAD_FOLDER)
        return jsonify({'assets': files}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@assets_bp.route('/<asset_id>', methods=['GET'])
def get_asset(asset_id):
    # Find file with this ID
    files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith(asset_id)]
    if files:
        return jsonify({'id': asset_id, 'filename': files[0]}), 200
    return jsonify({'error': 'Asset not found'}), 404

@assets_bp.route('/<asset_id>', methods=['DELETE'])
def delete_asset(asset_id):
    files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith(asset_id)]
    if files:
        file_path = os.path.join(UPLOAD_FOLDER, files[0])
        os.remove(file_path)
        return jsonify({'message': 'Asset deleted successfully'}), 200
    return jsonify({'error': 'Asset not found'}), 404

@assets_bp.route('/<asset_id>/download', methods=['GET'])
def download_asset(asset_id):
    files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith(asset_id)]
    if files:
        file_path = os.path.join(UPLOAD_FOLDER, files[0])
        return send_file(file_path, as_attachment=True)
    return jsonify({'error': 'Asset not found'}), 404