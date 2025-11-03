from skimage import feature, color
import cv2
import numpy as np

def extract_sift_features(image):
    """
    Extract SIFT features from the given image.
    
    Parameters:
    - image: Input image in BGR format.
    
    Returns:
    - keypoints: Detected keypoints.
    - descriptors: SIFT descriptors for the keypoints.
    """
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    sift = cv2.SIFT_create()
    keypoints, descriptors = sift.detectAndCompute(gray_image, None)
    return keypoints, descriptors

def extract_hog_features(image):
    """
    Extract HOG features from the given image.
    
    Parameters:
    - image: Input image in BGR format.
    
    Returns:
    - hog_features: HOG feature vector.
    """
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    hog_features, hog_image = feature.hog(gray_image, 
                                          orientations=9, 
                                          pixels_per_cell=(8, 8), 
                                          cells_per_block=(2, 2), 
                                          visualize=True, 
                                          multichannel=False)
    return hog_features

def process_image(image_path):
    """
    Process the image to extract SIFT and HOG features.
    
    Parameters:
    - image_path: Path to the input image.
    
    Returns:
    - keypoints: Detected keypoints from SIFT.
    - descriptors: SIFT descriptors.
    - hog_features: HOG feature vector.
    """
    image = cv2.imread(image_path)
    keypoints, descriptors = extract_sift_features(image)
    hog_features = extract_hog_features(image)
    return keypoints, descriptors, hog_features