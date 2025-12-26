from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
from datetime import datetime
import base64

# Import filter functions
from app.services.filters.spatial_domain.brightness import adjust_brightness
from app.services.filters.spatial_domain.contrast import adjust_contrast
from app.services.filters.spatial_domain.gaussian_blur import apply_gaussian_blur
from app.services.filters.spatial_domain.histogram_eq import equalize_histogram
from app.services.filters.spatial_domain.edge_detection import detect_edges
from app.services.filters.morphological.morphology import apply_morphology
from app.services.filters.morphological.canny_edge import apply_canny_edge
from app.services.filters.morphological.harris_corner import detect_harris_corners
from app.services.filters.morphological.hough_transform import apply_hough_transform
from app.services.filters.frequency_domain.fourier_transform import apply_fourier_transform
from app.services.filters.frequency_domain.frequency_filters import apply_frequency_filter
from app.services.filters.frequency_domain.compression import compress_image
from app.services.filters.ml_features.face_detection import detect_faces
from app.services.filters.ml_features.sift_hog import extract_sift, extract_hog
from app.services.filters.ml_features.pca_analysis import apply_pca
from app.services.video_service import VideoService, MOVIEPY_AVAILABLE

edits_bp = Blueprint('edits', __name__)

UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'uploads')

def get_image_path(image_id):
    """Find the image file with the given ID."""
    if not os.path.exists(UPLOAD_FOLDER):
        return None
    files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith(str(image_id))]
    if files:
        return os.path.join(UPLOAD_FOLDER, files[0])
    return None

def save_processed_image(image, original_filename):
    """Save processed image and return the path and new ID."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S_%f')
    new_id = f"processed_{timestamp}"
    filename = f"{new_id}_{original_filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    cv2.imwrite(filepath, image)
    return filepath, new_id

def image_to_base64(image):
    """Convert OpenCV image to base64 string."""
    _, buffer = cv2.imencode('.png', image)
    base64_str = base64.b64encode(buffer).decode('utf-8')
    return f"data:image/png;base64,{base64_str}"

def process_image(image_id, process_fn, success_message):
    """Generic image processing wrapper that returns base64 image."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        if image is None:
            return jsonify({'error': 'Could not read image'}), 500
        
        processed_image = process_fn(image)
        
        if processed_image is None:
            return jsonify({'error': 'Processing failed - no output image'}), 500
        
        output_path, new_id = save_processed_image(processed_image, os.path.basename(image_path))
        base64_image = image_to_base64(processed_image)
        
        return jsonify({
            'message': success_message,
            'image': base64_image,
            'id': new_id,
            'filepath': output_path
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==================== SPATIAL DOMAIN OPERATIONS ====================

@edits_bp.route('/image/<image_id>/brightness', methods=['POST'])
def edit_brightness(image_id):
    """Adjust image brightness."""
    data = request.json or {}
    value = data.get('value', 0)
    return process_image(
        image_id,
        lambda img: adjust_brightness(img, value),
        'Brightness adjusted successfully'
    )

@edits_bp.route('/image/<image_id>/contrast', methods=['POST'])
def edit_contrast(image_id):
    """Adjust image contrast."""
    data = request.json or {}
    factor = data.get('factor', 1.0)
    return process_image(
        image_id,
        lambda img: adjust_contrast(img, factor),
        'Contrast adjusted successfully'
    )

@edits_bp.route('/image/<image_id>/gaussian-blur', methods=['POST'])
def edit_gaussian_blur(image_id):
    """Apply Gaussian blur."""
    data = request.json or {}
    radius = data.get('radius', 5)
    return process_image(
        image_id,
        lambda img: apply_gaussian_blur(img, radius),
        'Gaussian blur applied successfully'
    )

@edits_bp.route('/image/<image_id>/histogram-equalize', methods=['POST'])
def edit_histogram_equalize(image_id):
    """Apply histogram equalization."""
    return process_image(
        image_id,
        lambda img: equalize_histogram(img),
        'Histogram equalized successfully'
    )

@edits_bp.route('/image/<image_id>/edge-detection', methods=['POST'])
def edit_edge_detection(image_id):
    """Detect edges in image."""
    data = request.json or {}
    method = data.get('method', 'sobel')
    return process_image(
        image_id,
        lambda img: detect_edges(img, method),
        'Edge detection applied successfully'
    )

# ==================== MORPHOLOGICAL OPERATIONS ====================

@edits_bp.route('/image/<image_id>/morphology', methods=['POST'])
def edit_morphology(image_id):
    """Apply morphological operation."""
    data = request.json or {}
    operation = data.get('operation', 'erode')
    kernel_size = data.get('kernel_size', 5)
    return process_image(
        image_id,
        lambda img: apply_morphology(img, operation, kernel_size),
        'Morphological operation applied successfully'
    )

@edits_bp.route('/image/<image_id>/canny-edge', methods=['POST'])
def edit_canny_edge(image_id):
    """Apply Canny edge detection."""
    data = request.json or {}
    threshold1 = data.get('threshold1', 100)
    threshold2 = data.get('threshold2', 200)
    return process_image(
        image_id,
        lambda img: apply_canny_edge(img, threshold1, threshold2),
        'Canny edge detection applied successfully'
    )

@edits_bp.route('/image/<image_id>/harris-corner', methods=['POST'])
def edit_harris_corner(image_id):
    """Detect Harris corners."""
    return process_image(
        image_id,
        lambda img: detect_harris_corners(img),
        'Harris corner detection applied successfully'
    )

@edits_bp.route('/image/<image_id>/hough-transform', methods=['POST'])
def edit_hough_transform(image_id):
    """Apply Hough transform for line detection."""
    return process_image(
        image_id,
        lambda img: apply_hough_transform(img),
        'Hough transform applied successfully'
    )

# ==================== FREQUENCY DOMAIN OPERATIONS ====================

@edits_bp.route('/image/<image_id>/fourier-transform', methods=['POST'])
def edit_fourier_transform(image_id):
    """Apply Fourier transform."""
    return process_image(
        image_id,
        lambda img: apply_fourier_transform(img),
        'Fourier transform applied successfully'
    )

@edits_bp.route('/image/<image_id>/frequency-filter', methods=['POST'])
def edit_frequency_filter(image_id):
    """Apply frequency domain filter."""
    data = request.json or {}
    filter_type = data.get('filter_type', 'lowpass')
    cutoff = data.get('cutoff', 30)
    return process_image(
        image_id,
        lambda img: apply_frequency_filter(img, filter_type, cutoff),
        'Frequency filter applied successfully'
    )

@edits_bp.route('/image/<image_id>/compress', methods=['POST'])
def edit_compress(image_id):
    """Compress image."""
    data = request.json or {}
    quality = data.get('quality', 80)
    return process_image(
        image_id,
        lambda img: compress_image(img, quality),
        'Image compressed successfully'
    )

# ==================== ML FEATURES ====================

@edits_bp.route('/image/<image_id>/face-detection', methods=['POST'])
def edit_face_detection(image_id):
    """Detect faces in image."""
    return process_image(
        image_id,
        lambda img: detect_faces(img),
        'Face detection applied successfully'
    )

@edits_bp.route('/image/<image_id>/sift', methods=['POST'])
def edit_sift(image_id):
    """Extract SIFT features."""
    return process_image(
        image_id,
        lambda img: extract_sift(img),
        'SIFT features extracted successfully'
    )

@edits_bp.route('/image/<image_id>/hog', methods=['POST'])
def edit_hog(image_id):
    """Extract HOG features."""
    return process_image(
        image_id,
        lambda img: extract_hog(img),
        'HOG features extracted successfully'
    )

@edits_bp.route('/image/<image_id>/pca', methods=['POST'])
def edit_pca(image_id):
    """Apply PCA analysis."""
    data = request.json or {}
    n_components = data.get('n_components', 50)
    return process_image(
        image_id,
        lambda img: apply_pca(img, n_components),
        'PCA analysis applied successfully'
    )

# ==================== CROP OPERATION ====================

@edits_bp.route('/image/<image_id>/crop', methods=['POST'])
def edit_crop(image_id):
    """Crop image to specified region."""
    try:
        data = request.json or {}
        x = int(data.get('x', 0))
        y = int(data.get('y', 0))
        width = int(data.get('width', 100))
        height = int(data.get('height', 100))
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        if image is None:
            return jsonify({'error': 'Could not read image'}), 500
        
        # Get image dimensions
        img_height, img_width = image.shape[:2]
        
        # Clamp crop region to image bounds
        x = max(0, min(x, img_width - 1))
        y = max(0, min(y, img_height - 1))
        width = min(width, img_width - x)
        height = min(height, img_height - y)
        
        # Crop the image
        cropped_image = image[y:y+height, x:x+width]
        
        output_path, new_id = save_processed_image(cropped_image, os.path.basename(image_path))
        base64_image = image_to_base64(cropped_image)
        
        return jsonify({
            'message': 'Image cropped successfully',
            'image': base64_image,
            'id': new_id,
            'filepath': output_path,
            'dimensions': {
                'original': {'width': img_width, 'height': img_height},
                'cropped': {'width': width, 'height': height}
            }
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==================== VIDEO EDITING OPERATIONS ====================

def get_video_path(video_id):
    """Find the video file path by video ID (timestamp)."""
    if not os.path.exists(UPLOAD_FOLDER):
        return None
    
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.startswith(str(video_id)) and any(filename.lower().endswith(ext) for ext in ['.mp4', '.avi', '.mov', '.mkv', '.webm']):
            return os.path.join(UPLOAD_FOLDER, filename)
    return None

def save_processed_video(video_clip, original_filename):
    """Save processed video and return the filepath."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"processed_{timestamp}_{original_filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    video_clip.write_videofile(filepath, codec='libx264', audio_codec='aac')
    return filepath

@edits_bp.route('/video/<video_id>/trim', methods=['POST'])
def edit_video_trim(video_id):
    """Trim video to specified duration."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json or {}
        start_time = float(data.get('start_time', 0))
        end_time = float(data.get('end_time', 10))
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.trim_video(video_path, start_time, end_time)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        # Generate new video ID from output path
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': 'Video trimmed successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/speed', methods=['POST'])
def edit_video_speed(video_id):
    """Change video playback speed."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json or {}
        speed = float(data.get('speed', 1.0))
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.change_speed(video_path, speed)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        # Generate new video ID from output path
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': 'Video speed changed successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/filter', methods=['POST'])
def edit_video_filter(video_id):
    """Apply filter to video."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json or {}
        filter_type = data.get('filter_type', 'grayscale')
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.apply_filter(video_path, filter_type)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': f'{filter_type} filter applied successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/rotate', methods=['POST'])
def edit_video_rotate(video_id):
    """Rotate video by specified angle."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json or {}
        angle = float(data.get('angle', 90))
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.rotate_video(video_path, angle)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': f'Video rotated {angle} degrees successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/volume', methods=['POST'])
def edit_video_volume(video_id):
    """Adjust video volume."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json or {}
        volume = float(data.get('volume', 1.0))
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.adjust_volume(video_path, volume)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': 'Video volume adjusted successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/mute', methods=['POST'])
def edit_video_mute(video_id):
    """Remove audio from video."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.remove_audio(video_path)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        new_video_id = os.path.basename(output_path).split('_')[1] + '_' + os.path.basename(output_path).split('_')[2]
        
        return jsonify({
            'message': 'Audio removed from video successfully',
            'filepath': output_path,
            'id': new_video_id,
            'filename': os.path.basename(output_path)
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/info', methods=['GET'])
def get_video_info(video_id):
    """Get video metadata."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        info = video_service.get_video_info(video_path)
        
        return jsonify({
            'message': 'Video info retrieved successfully',
            'info': info
        }), 200
    except Exception as e:
        import traceback
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500
