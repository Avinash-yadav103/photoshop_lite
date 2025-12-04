from flask import Blueprint, request, jsonify
from app.services.video_service import VideoService, MOVIEPY_AVAILABLE
import os

video_bp = Blueprint('video', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'uploads')

# This endpoint is deprecated - use /api/assets/upload/video instead
@video_bp.route('/upload', methods=['POST'])
def upload_video():
    return jsonify({'error': 'This endpoint is deprecated. Use /api/assets/upload/video instead'}), 410

@video_bp.route('/process', methods=['POST'])
def process_video():
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    data = request.json
    video_path = data.get('video_path')
    action = data.get('action')
    video_service = VideoService(UPLOAD_FOLDER)
    
    if action == 'trim':
        start_time = data.get('start_time')
        end_time = data.get('end_time')
        processed_video_path = video_service.trim_video(video_path, start_time, end_time)
        return jsonify({'message': 'Video trimmed successfully', 'path': processed_video_path}), 200
    
    elif action == 'merge':
        video_paths = data.get('video_paths')
        merged_video_path = video_service.merge_videos(video_paths)
        return jsonify({'message': 'Videos merged successfully', 'path': merged_video_path}), 200
    
    # Add more actions as needed
    return jsonify({'error': 'Invalid action'}), 400

@video_bp.route('/snapshot', methods=['GET'])
def snapshot():
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    video_path = request.args.get('video_path')
    frame_time = request.args.get('frame_time')
    video_service = VideoService(UPLOAD_FOLDER)
    snapshot_path = video_service.capture_snapshot(video_path, frame_time)
    return jsonify({'message': 'Snapshot captured successfully', 'path': snapshot_path}), 200

@video_bp.route('/convert', methods=['POST'])
def convert_video():
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    data = request.json
    video_path = data.get('video_path')
    format = data.get('format')
    video_service = VideoService(UPLOAD_FOLDER)
    converted_video_path = video_service.convert_video_format(video_path, format)
    return jsonify({'message': 'Video converted successfully', 'path': converted_video_path}), 200