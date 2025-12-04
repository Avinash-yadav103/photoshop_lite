import cv2
import numpy as np

def adjust_contrast(image, factor):
    """
    Adjusts the contrast of an image.

    Parameters:
    - image: Input image as a NumPy array (BGR format from OpenCV).
    - factor: Contrast adjustment factor. 
              A factor of 1.0 returns the original image,
              less than 1.0 decreases contrast,
              and greater than 1.0 increases contrast.

    Returns:
    - Adjusted image as a NumPy array.
    """
    # Use OpenCV's convertScaleAbs for contrast adjustment
    # Formula: new_image = alpha * image + beta
    # For contrast: alpha = factor, beta = 0
    adjusted_image = cv2.convertScaleAbs(image, alpha=factor, beta=0)
    return adjusted_image
    return (adjusted * 255).astype(np.uint8)