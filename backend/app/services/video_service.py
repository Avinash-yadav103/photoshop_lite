from moviepy.editor import VideoFileClip, concatenate_videoclips
import os

class VideoService:
    def __init__(self, upload_folder):
        self.upload_folder = upload_folder

    def trim_video(self, video_path, start_time, end_time):
        """Trim a video to the specified start and end times."""
        video = VideoFileClip(video_path)
        trimmed_video = video.subclip(start_time, end_time)
        return trimmed_video

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
        video = video.set_audio(new_audio)
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
