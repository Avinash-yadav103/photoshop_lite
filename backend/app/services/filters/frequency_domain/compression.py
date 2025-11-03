def compress_image(image, quality=85):
    """
    Compresses an image using JPEG compression.

    Parameters:
    - image: The input image to be compressed.
    - quality: The quality of the output image (1-100).

    Returns:
    - Compressed image.
    """
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    result, encoded_image = cv2.imencode('.jpg', image, encode_param)
    if not result:
        raise ValueError("Image compression failed.")
    return cv2.imdecode(encoded_image, cv2.IMREAD_COLOR)

def compress_video(input_video_path, output_video_path, codec='mp4v', quality=20):
    """
    Compresses a video using the specified codec and quality.

    Parameters:
    - input_video_path: Path to the input video file.
    - output_video_path: Path to save the compressed video.
    - codec: Codec to be used for compression (default is 'mp4v').
    - quality: Quality of the output video (1-31, lower is better).

    Returns:
    - None
    """
    cap = cv2.VideoCapture(input_video_path)
    fourcc = cv2.VideoWriter_fourcc(*codec)
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    out = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        out.write(frame)

    cap.release()
    out.release()