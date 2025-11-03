from cv2 import cv2

def detect_faces(image):
    """
    Detects faces in an image using the Viola-Jones method.
    
    Parameters:
        image (numpy.ndarray): The input image in which faces are to be detected.
        
    Returns:
        list: A list of rectangles where faces are detected. Each rectangle is represented as (x, y, w, h).
    """
    # Load the pre-trained Haar Cascade classifier for face detection
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    
    # Convert the image to grayscale for better detection
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Detect faces in the image
    faces = face_cascade.detectMultiScale(gray_image, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    
    return faces

def draw_faces(image, faces):
    """
    Draws rectangles around detected faces on the image.
    
    Parameters:
        image (numpy.ndarray): The input image on which to draw rectangles.
        faces (list): A list of rectangles where faces are detected.
        
    Returns:
        numpy.ndarray: The image with rectangles drawn around detected faces.
    """
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (255, 0, 0), 2)
    
    return image