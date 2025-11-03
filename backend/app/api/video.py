from flask import Blueprint, request, jsonify
from app.services.video_service import VideoService

video_bp = Blueprint('video', __name__)

@video_bp.route('/upload', methods=['POST'])
def upload_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    video_service = VideoService()
    video_path = video_service.save_video(file)
    return jsonify({'message': 'Video uploaded successfully', 'path': video_path}), 201

@video_bp.route('/process', methods=['POST'])
def process_video():
    data = request.json
    video_path = data.get('video_path')
    action = data.get('action')
    video_service = VideoService()
    
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
    video_path = request.args.get('video_path')
    frame_time = request.args.get('frame_time')
    video_service = VideoService()
    snapshot_path = video_service.capture_snapshot(video_path, frame_time)
    return jsonify({'message': 'Snapshot captured successfully', 'path': snapshot_path}), 200

@video_bp.route('/convert', methods=['POST'])
def convert_video():
    data = request.json
    video_path = data.get('video_path')
    format = data.get('format')
    video_service = VideoService()
    converted_video_path = video_service.convert_video_format(video_path, format)
    return jsonify({'message': 'Video converted successfully', 'path': converted_video_path}), 200