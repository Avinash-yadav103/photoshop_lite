import cv2
import numpy as np

def detect_faces(image):
    """
    Detects faces in an image using the Viola-Jones method and draws rectangles.
    
    Parameters:
        image (numpy.ndarray): The input image in BGR format.
        
    Returns:
        numpy.ndarray: The image with rectangles drawn around detected faces.
    """
    # Load the pre-trained Haar Cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Convert the image to grayscale for better detection
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    # Draw rectangles on a copy of the original image
    result = image.copy()
    for (x, y, w, h) in faces:
        cv2.rectangle(result, (x, y), (x + w, y + h), (0, 255, 0), 2)
    
    return result