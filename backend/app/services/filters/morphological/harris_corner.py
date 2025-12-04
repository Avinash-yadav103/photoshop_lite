import cv2
import numpy as np

def detect_harris_corners(image, threshold=0.01):
    """
    Implements Harris corner detection algorithm.
    
    Parameters:
    - image: Input image (BGR format).
    - threshold: Threshold for corner detection.

    Returns:
    - corners: Image with detected corners marked.
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Convert image to float32
    gray = np.float32(gray)

    # Harris corner detection
    dst = cv2.cornerHarris(gray, 2, 3, 0.04)

    # Result is dilated for marking the corners
    dst = cv2.dilate(dst, None)

    # Create output image
    result = image.copy()
    result[dst > threshold * dst.max()] = [0, 0, 255]  # Mark corners in red

    return result