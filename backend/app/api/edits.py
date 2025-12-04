from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename
import os
import cv2
import numpy as np
from datetime import datetime

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
    files = [f for f in os.listdir(UPLOAD_FOLDER) if f.startswith(image_id)]
    if files:
        return os.path.join(UPLOAD_FOLDER, files[0])
    return None

def save_processed_image(image, original_filename):
    """Save processed image and return the path."""
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"processed_{timestamp}_{original_filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    cv2.imwrite(filepath, image)
    return filepath

# ==================== SPATIAL DOMAIN OPERATIONS ====================

@edits_bp.route('/image/<image_id>/brightness', methods=['POST'])
def edit_brightness(image_id):
    """Adjust image brightness."""
    try:
        data = request.json
        value = data.get('value', 0)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = adjust_brightness(image, value)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Brightness adjusted successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/contrast', methods=['POST'])
def edit_contrast(image_id):
    """Adjust image contrast."""
    try:
        data = request.json
        factor = data.get('factor', 1.0)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = adjust_contrast(image, factor)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Contrast adjusted successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/gaussian-blur', methods=['POST'])
def edit_gaussian_blur(image_id):
    """Apply Gaussian blur."""
    try:
        data = request.json
        radius = data.get('radius', 5)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_gaussian_blur(image, radius)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Gaussian blur applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/histogram-equalize', methods=['POST'])
def edit_histogram_equalize(image_id):
    """Apply histogram equalization."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = equalize_histogram(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Histogram equalized successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/edge-detection', methods=['POST'])
def edit_edge_detection(image_id):
    """Detect edges in image."""
    try:
        data = request.json
        method = data.get('method', 'sobel')
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = detect_edges(image, method)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Edge detection applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== MORPHOLOGICAL OPERATIONS ====================

@edits_bp.route('/image/<image_id>/morphology', methods=['POST'])
def edit_morphology(image_id):
    """Apply morphological operation."""
    try:
        data = request.json
        operation = data.get('operation', 'erode')
        kernel_size = data.get('kernel_size', 5)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_morphology(image, operation, kernel_size)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Morphological operation applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/canny-edge', methods=['POST'])
def edit_canny_edge(image_id):
    """Apply Canny edge detection."""
    try:
        data = request.json
        threshold1 = data.get('threshold1', 100)
        threshold2 = data.get('threshold2', 200)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_canny_edge(image, threshold1, threshold2)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Canny edge detection applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/harris-corner', methods=['POST'])
def edit_harris_corner(image_id):
    """Detect Harris corners."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = detect_harris_corners(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Harris corner detection applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/hough-transform', methods=['POST'])
def edit_hough_transform(image_id):
    """Apply Hough transform for line detection."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_hough_transform(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Hough transform applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== FREQUENCY DOMAIN OPERATIONS ====================

@edits_bp.route('/image/<image_id>/fourier-transform', methods=['POST'])
def edit_fourier_transform(image_id):
    """Apply Fourier transform."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_fourier_transform(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Fourier transform applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/frequency-filter', methods=['POST'])
def edit_frequency_filter(image_id):
    """Apply frequency domain filter."""
    try:
        data = request.json
        filter_type = data.get('filter_type', 'lowpass')
        cutoff = data.get('cutoff', 30)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_frequency_filter(image, filter_type, cutoff)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Frequency filter applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/compress', methods=['POST'])
def edit_compress(image_id):
    """Compress image."""
    try:
        data = request.json
        quality = data.get('quality', 80)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = compress_image(image, quality)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Image compressed successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== ML FEATURES ====================

@edits_bp.route('/image/<image_id>/face-detection', methods=['POST'])
def edit_face_detection(image_id):
    """Detect faces in image."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = detect_faces(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'Face detection applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/sift', methods=['POST'])
def edit_sift(image_id):
    """Extract SIFT features."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = extract_sift(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'SIFT features extracted successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/hog', methods=['POST'])
def edit_hog(image_id):
    """Extract HOG features."""
    try:
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = extract_hog(image)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'HOG features extracted successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/image/<image_id>/pca', methods=['POST'])
def edit_pca(image_id):
    """Apply PCA analysis."""
    try:
        data = request.json
        n_components = data.get('n_components', 50)
        
        image_path = get_image_path(image_id)
        if not image_path:
            return jsonify({'error': 'Image not found'}), 404
        
        image = cv2.imread(image_path)
        processed_image = apply_pca(image, n_components)
        
        output_path = save_processed_image(processed_image, os.path.basename(image_path))
        
        return jsonify({
            'message': 'PCA analysis applied successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ==================== VIDEO EDITING OPERATIONS ====================

def get_video_path(video_id):
    """Find the video file path by video ID (timestamp)."""
    if not os.path.exists(UPLOAD_FOLDER):
        return None
    
    for filename in os.listdir(UPLOAD_FOLDER):
        if filename.startswith(video_id) and any(filename.lower().endswith(ext) for ext in ['.mp4', '.avi', '.mov', '.mkv', '.webm']):
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
        data = request.json
        start_time = data.get('start_time', 0)
        end_time = data.get('end_time', 10)
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        video_service = VideoService(UPLOAD_FOLDER)
        processed_video = video_service.trim_video(video_path, start_time, end_time)
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        return jsonify({
            'message': 'Video trimmed successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/speed', methods=['POST'])
def edit_video_speed(video_id):
    """Change video playback speed."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json
        speed = data.get('speed', 1.0)
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        from moviepy.editor import VideoFileClip
        video = VideoFileClip(video_path)
        
        # Change speed by modifying fps
        if speed > 1:
            # Speed up - reduce duration
            processed_video = video.speedx(speed)
        else:
            # Slow down - increase duration
            processed_video = video.speedx(speed)
        
        output_path = save_processed_video(processed_video, os.path.basename(video_path))
        
        return jsonify({
            'message': 'Video speed changed successfully',
            'filepath': output_path
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@edits_bp.route('/video/<video_id>/extract-frames', methods=['POST'])
def edit_video_extract_frames(video_id):
    """Extract frames from video."""
    if not MOVIEPY_AVAILABLE:
        return jsonify({'error': 'Video processing is not available. MoviePy is not installed.'}), 503
    
    try:
        data = request.json
        fps = data.get('fps', 1)
        
        video_path = get_video_path(video_id)
        if not video_path:
            return jsonify({'error': 'Video not found'}), 404
        
        from moviepy.editor import VideoFileClip
        video = VideoFileClip(video_path)
        
        # Extract frames at specified fps
        frames_folder = os.path.join(UPLOAD_FOLDER, f'frames_{video_id}')
        os.makedirs(frames_folder, exist_ok=True)
        
        duration = int(video.duration)
        frame_times = [i for i in range(0, duration, int(1/fps)) if i < duration]
        
        for idx, t in enumerate(frame_times):
            frame = video.get_frame(t)
            frame_path = os.path.join(frames_folder, f'frame_{idx:04d}.jpg')
            cv2.imwrite(frame_path, cv2.cvtColor(frame, cv2.COLOR_RGB2BGR))
        
        return jsonify({
            'message': f'Extracted {len(frame_times)} frames successfully',
            'frames_folder': frames_folder
        }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500