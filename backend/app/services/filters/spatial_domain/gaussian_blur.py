import cv2
import numpy as np

def apply_gaussian_blur(image, radius=5):
    """
    Applies Gaussian blur to the input image.

    Parameters:
    - image: Input image as a NumPy array (BGR format from OpenCV).
    - radius: Radius for Gaussian kernel (must be odd). Higher values result in more blur.

    Returns:
    - Blurred image as a NumPy array.
    """
    # Ensure radius is odd
    if radius % 2 == 0:
        radius += 1
    
    return cv2.GaussianBlur(image, (radius, radius), 0)