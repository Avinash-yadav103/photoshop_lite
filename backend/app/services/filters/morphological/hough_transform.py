from scipy import ndimage
import numpy as np
import cv2

def hough_transform(image, threshold=100):
    """
    Implements the Hough Transform for detecting lines in an image.
    
    Parameters:
    - image: Input image (grayscale).
    - threshold: Minimum number of votes to consider a line valid.
    
    Returns:
    - lines: Detected lines in the format (rho, theta).
    """
    # Perform edge detection using Canny
    edges = cv2.Canny(image, 50, 150, apertureSize=3)
    
    # Perform Hough Transform
    lines = cv2.HoughLines(edges, 1, np.pi / 180, threshold)
    
    return lines

def draw_hough_lines(image, lines):
    """
    Draws detected lines on the image.
    
    Parameters:
    - image: Original image on which to draw lines.
    - lines: Detected lines in the format (rho, theta).
    
    Returns:
    - image_with_lines: Image with drawn lines.
    """
    image_with_lines = image.copy()
    
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
            cv2.line(image_with_lines, (x1, y1), (x2, y2), (0, 255, 0), 2)
    
    return image_with_lines