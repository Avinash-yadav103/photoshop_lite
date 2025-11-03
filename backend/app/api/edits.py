from flask import Blueprint, request, jsonify
from app.services.image_service import apply_filter
from app.services.video_service import process_video

edits_bp = Blueprint('edits', __name__)

@edits_bp.route('/edit/image', methods=['POST'])
def edit_image():
    data = request.json
    image_data = data.get('image')
    filter_type = data.get('filter')

    if not image_data or not filter_type:
        return jsonify({'error': 'Image data and filter type are required.'}), 400

    try:
        edited_image = apply_filter(image_data, filter_type)
        return jsonify({'edited_image': edited_image}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/edit/video', methods=['POST'])
def edit_video():
    data = request.json
    video_data = data.get('video')
    action = data.get('action')

    if not video_data or not action:
        return jsonify({'error': 'Video data and action are required.'}), 400

    try:
        processed_video = process_video(video_data, action)
        return jsonify({'processed_video': processed_video}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500