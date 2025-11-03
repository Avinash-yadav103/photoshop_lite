def fourier_transform(image):
    """
    Applies the Fourier Transform to the input image and returns the magnitude spectrum.
    
    Parameters:
    - image: Input image (numpy array).
    
    Returns:
    - magnitude_spectrum: Magnitude spectrum of the Fourier Transform.
    """
    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Perform the Fourier Transform
    f_transform = np.fft.fft2(gray_image)
    
    # Shift the zero frequency component to the center
    f_transform_shifted = np.fft.fftshift(f_transform)
    
    # Calculate the magnitude spectrum
    magnitude_spectrum = np.log(np.abs(f_transform_shifted) + 1)  # Adding 1 to avoid log(0)
    
    return magnitude_spectrum