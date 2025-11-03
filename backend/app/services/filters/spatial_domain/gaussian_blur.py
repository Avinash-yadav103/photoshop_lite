from scipy.ndimage import gaussian_filter
import numpy as np

def apply_gaussian_blur(image, sigma=1.0):
    """
    Applies Gaussian blur to the input image.

    Parameters:
    - image: Input image as a NumPy array.
    - sigma: Standard deviation for Gaussian kernel. Higher values result in more blur.

    Returns:
    - Blurred image as a NumPy array.
    """
    return gaussian_filter(image, sigma=sigma)