from moviepy.editor import VideoFileClip
import numpy as np

def analyze_video(video_path):
    """
    Analyzes the video to extract key information such as duration, frame rate,
    and basic statistics about the frames.

    Parameters:
    - video_path: str, path to the video file

    Returns:
    - dict: A dictionary containing video analysis results
    """
    clip = VideoFileClip(video_path)
    
    # Extracting video properties
    duration = clip.duration  # in seconds
    fps = clip.fps  # frames per second
    num_frames = int(duration * fps)

    # Example of frame analysis: calculating average color
    average_colors = []
    for frame in clip.iter_frames(fps=fps):
        avg_color = np.mean(frame, axis=(0, 1))  # Average color per frame
        average_colors.append(avg_color)

    # Calculate overall average color
    overall_avg_color = np.mean(average_colors, axis=0)

    return {
        "duration": duration,
        "fps": fps,
        "num_frames": num_frames,
        "overall_avg_color": overall_avg_color.tolist()  # Convert to list for JSON serialization
    }