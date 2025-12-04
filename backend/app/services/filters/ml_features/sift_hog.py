import cv2
import numpy as np
from skimage import feature

def extract_sift(image):
    """
    Extract SIFT features from the given image and draw keypoints.
    
    Parameters:
    - image: Input image in BGR format.
    
    Returns:
    - Image with SIFT keypoints drawn.
    """
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    sift = cv2.SIFT_create()
    keypoints, descriptors = sift.detectAndCompute(gray_image, None)
    
    # Draw keypoints on the image
    result = cv2.drawKeypoints(image, keypoints, None, flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS)
    return result

def extract_hog(image):
    """
    Extract HOG features from the given image and return visualization.
    
    Parameters:
    - image: Input image in BGR format.
    
    Returns:
    - HOG visualization image.
    """
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hog_features, hog_image = feature.hog(gray_image, 
                                          orientations=9, 
                                          pixels_per_cell=(8, 8), 
                                          cells_per_block=(2, 2), 
                                          visualize=True)
    
    # Normalize HOG image for display
    hog_image = (hog_image * 255).astype(np.uint8)
    return hog_image