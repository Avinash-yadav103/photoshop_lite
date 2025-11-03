from celery import Celery
from app.services.video_service import process_video

celery = Celery(__name__)

@celery.task
def render_video(video_path, output_path, options):
    """
    Long-running task to render a video.
    
    :param video_path: Path to the input video file.
    :param output_path: Path to save the rendered video.
    :param options: Additional options for video processing.
    """
    try:
        process_video(video_path, output_path, options)
        return {'status': 'success', 'output_path': output_path}
    except Exception as e:
        return {'status': 'error', 'message': str(e)}