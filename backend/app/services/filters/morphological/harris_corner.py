from scipy import ndimage
import numpy as np
import cv2

def harris_corner_detection(image, threshold=0.01):
    """
    Implements Harris corner detection algorithm.
    
    Parameters:
    - image: Input image (grayscale).
    - threshold: Threshold for corner detection.

    Returns:
    - corners: Image with detected corners marked.
    """
    # Convert image to float32
    gray = np.float32(image)

    # Harris corner detection
    dst = cv2.cornerHarris(gray, 2, 3, 0.04)

    # Result is dilated for marking the corners
    dst = cv2.dilate(dst, None)

    # Create a mask for corners
    corners = np.zeros_like(image)
    corners[dst > threshold * dst.max()] = 255

    return corners