import cv2
import numpy as np

def compress_image(image, quality=85):
    """
    Compresses an image using JPEG compression.

    Parameters:
    - image: The input image to be compressed (BGR format).
    - quality: The quality of the output image (1-100).

    Returns:
    - Compressed image.
    """
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), quality]
    result, encoded_image = cv2.imencode('.jpg', image, encode_param)
    if not result:
        raise ValueError("Image compression failed.")
    return cv2.imdecode(encoded_image, cv2.IMREAD_COLOR)