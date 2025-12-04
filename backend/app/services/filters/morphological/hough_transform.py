import cv2
import numpy as np

def apply_hough_transform(image, threshold=100):
    """
    Implements the Hough Transform for detecting lines in an image.
    
    Parameters:
    - image: Input image (BGR format).
    - threshold: Minimum number of votes to consider a line valid.
    
    Returns:
    - image_with_lines: Image with detected lines drawn.
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Perform edge detection using Canny
    edges = cv2.Canny(gray, 50, 150, apertureSize=3)
    
    # Perform Hough Transform
    lines = cv2.HoughLines(edges, 1, np.pi / 180, threshold)
    
    # Draw lines on the image
    result = image.copy()
    
    if lines is not None:
        for rho, theta in lines[:, 0]:
            a = np.cos(theta)
            b = np.sin(theta)
            x0 = a * rho
            y0 = b * rho
            x1 = int(x0 + 1000 * (-b))
            y1 = int(y0 + 1000 * (a))
            x2 = int(x0 - 1000 * (-b))
            y2 = int(y0 - 1000 * (a))
            cv2.line(result, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
    return result