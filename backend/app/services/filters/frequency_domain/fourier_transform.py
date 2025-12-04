import cv2
import numpy as np

def apply_fourier_transform(image):
    """
    Applies the Fourier Transform to the input image and returns the magnitude spectrum.
    
    Parameters:
    - image: Input image (BGR format from OpenCV).
    
    Returns:
    - magnitude_spectrum: Magnitude spectrum of the Fourier Transform as uint8 image.
    """
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Perform the Fourier Transform
    f_transform = np.fft.fft2(gray_image)
    
    # Shift the zero frequency component to the center
    f_transform_shifted = np.fft.fftshift(f_transform)
    
    # Calculate the magnitude spectrum
    magnitude_spectrum = np.log(np.abs(f_transform_shifted) + 1)  # Adding 1 to avoid log(0)
    
    # Normalize to 0-255 range
    magnitude_spectrum = cv2.normalize(magnitude_spectrum, None, 0, 255, cv2.NORM_MINMAX)
    magnitude_spectrum = np.uint8(magnitude_spectrum)
    
    return magnitude_spectrum