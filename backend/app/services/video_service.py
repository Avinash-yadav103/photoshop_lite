try:
    from moviepy import VideoFileClip, concatenate_videoclips, AudioFileClip
    from moviepy.video.fx import MultiplySpeed, BlackAndWhite, InvertColors, MirrorX, MirrorY
    MOVIEPY_AVAILABLE = True
    MOVIEPY_VERSION = 2
except ImportError:
    try:
        from moviepy.editor import VideoFileClip, concatenate_videoclips, AudioFileClip
        from moviepy.video.fx.all import speedx, blackwhite, invert_colors, mirror_x, mirror_y
        MOVIEPY_AVAILABLE = True
        MOVIEPY_VERSION = 1
    except ImportError:
        MOVIEPY_AVAILABLE = False
        MOVIEPY_VERSION = 0
        print("Warning: moviepy not available. Video processing features will be disabled.")

import os
import numpy as np

class VideoService:
    def __init__(self, upload_folder):
        self.upload_folder = upload_folder

    def trim_video(self, video_path, start_time, end_time):
        """Trim a video to the specified start and end times."""
        video = VideoFileClip(video_path)
        # Ensure valid time range
        start_time = max(0, float(start_time))
        end_time = min(float(end_time), video.duration)
        if end_time <= start_time:
            end_time = min(start_time + 1, video.duration)
        trimmed_video = video.subclipped(start_time, end_time)
        return trimmed_video

    def change_speed(self, video_path, speed_factor):
        """Change the speed of a video."""
        video = VideoFileClip(video_path)
        speed_factor = float(speed_factor)
        if speed_factor <= 0:
            speed_factor = 1.0
        
        if MOVIEPY_VERSION == 2:
            # MoviePy v2 uses effect classes
            speed_effect = MultiplySpeed(factor=speed_factor)
            processed_video = video.with_effects([speed_effect])
        else:
            # MoviePy v1 uses fx functions
            processed_video = video.fx(speedx, speed_factor)
        
        return processed_video

    def apply_filter(self, video_path, filter_type):
        """Apply a filter to the video."""
        video = VideoFileClip(video_path)
        
        if MOVIEPY_VERSION == 2:
            if filter_type == 'grayscale':
                processed_video = video.with_effects([BlackAndWhite()])
            elif filter_type == 'invert':
                processed_video = video.with_effects([InvertColors()])
            elif filter_type == 'mirror_h':
                processed_video = video.with_effects([MirrorX()])
            elif filter_type == 'mirror_v':
                processed_video = video.with_effects([MirrorY()])
            elif filter_type == 'sepia':
                def sepia_filter(frame):
                    frame = frame.astype(np.float64)
                    r = frame[:,:,0] * 0.393 + frame[:,:,1] * 0.769 + frame[:,:,2] * 0.189
                    g = frame[:,:,0] * 0.349 + frame[:,:,1] * 0.686 + frame[:,:,2] * 0.168
                    b = frame[:,:,0] * 0.272 + frame[:,:,1] * 0.534 + frame[:,:,2] * 0.131
                    frame[:,:,0] = np.clip(r, 0, 255)
                    frame[:,:,1] = np.clip(g, 0, 255)
                    frame[:,:,2] = np.clip(b, 0, 255)
                    return frame.astype(np.uint8)
                processed_video = video.image_transform(sepia_filter)
            else:
                processed_video = video
        else:
            # MoviePy v1
            if filter_type == 'grayscale':
                processed_video = video.fx(blackwhite)
            elif filter_type == 'invert':
                processed_video = video.fx(invert_colors)
            elif filter_type == 'mirror_h':
                processed_video = video.fx(mirror_x)
            elif filter_type == 'mirror_v':
                processed_video = video.fx(mirror_y)
            else:
                processed_video = video
        
        return processed_video

    def rotate_video(self, video_path, angle):
        """Rotate video by specified angle."""
        video = VideoFileClip(video_path)
        if MOVIEPY_VERSION == 2:
            from moviepy.video.fx import Rotate
            processed_video = video.with_effects([Rotate(angle=angle)])
        else:
            processed_video = video.rotate(angle)
        return processed_video

    def adjust_volume(self, video_path, volume_factor):
        """Adjust video volume."""
        video = VideoFileClip(video_path)
        if video.audio is not None:
            if MOVIEPY_VERSION == 2:
                from moviepy.audio.fx import MultiplyVolume
                new_audio = video.audio.with_effects([MultiplyVolume(factor=volume_factor)])
                video = video.with_audio(new_audio)
            else:
                video = video.volumex(volume_factor)
        return video

    def merge_videos(self, video_paths):
        """Merge multiple videos into one."""
        clips = [VideoFileClip(video) for video in video_paths]
        final_video = concatenate_videoclips(clips)
        return final_video

    def extract_audio(self, video_path):
        """Extract audio from a video file."""
        video = VideoFileClip(video_path)
        audio = video.audio
        return audio

    def replace_audio(self, video_path, new_audio_path):
        """Replace the audio of a video with a new audio file."""
        video = VideoFileClip(video_path)
        new_audio = AudioFileClip(new_audio_path)
        if MOVIEPY_VERSION == 2:
            video = video.with_audio(new_audio)
        else:
            video = video.set_audio(new_audio)
        return video

    def remove_audio(self, video_path):
        """Remove audio from video."""
        video = VideoFileClip(video_path)
        if MOVIEPY_VERSION == 2:
            video = video.with_audio(None)
        else:
            video = video.without_audio()
        return video

    def convert_video_format(self, video_path, target_format):
        """Convert a video to a different format."""
        base = os.path.splitext(video_path)[0]
        new_video_path = f"{base}.{target_format}"
        video = VideoFileClip(video_path)
        video.write_videofile(new_video_path, codec='libx264')
        return new_video_path

    def snapshot_from_video(self, video_path, time):
        """Take a snapshot from a video at a specific time."""
        video = VideoFileClip(video_path)
        frame = video.get_frame(time)
        return frame

    def get_video_info(self, video_path):
        """Get video metadata."""
        video = VideoFileClip(video_path)
        return {
            'duration': video.duration,
            'fps': video.fps,
            'size': video.size,
            'has_audio': video.audio is not None
        }

def process_video(video_data, operation_type, **kwargs):
    """
    Process video with specified operation.
    Placeholder function for video processing.
    """
    if not MOVIEPY_AVAILABLE:
        raise Exception("Video processing is not available. MoviePy is not installed.")
    
    # Placeholder implementation
    return {"status": "success", "message": f"Video processing '{operation_type}' completed"}
