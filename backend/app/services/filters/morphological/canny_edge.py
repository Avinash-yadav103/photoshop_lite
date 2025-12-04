import cv2
import numpy as np

def apply_canny_edge(image, threshold1=100, threshold2=200):
    """
    Applies Canny edge detection to the input image.

    Parameters:
    - image: Input image in which edges are to be detected.
    - threshold1: Lower threshold for the hysteresis procedure.
    - threshold2: Upper threshold for the hysteresis procedure.

    Returns:
    - edges: Binary image with detected edges.
    """
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Canny edge detection
    edges = cv2.Canny(gray_image, threshold1, threshold2)

    return edges