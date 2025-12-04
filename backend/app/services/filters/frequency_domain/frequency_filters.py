import cv2
import numpy as np

def apply_frequency_filter(image, filter_type='lowpass', cutoff=30):
    """
    Apply frequency domain filter to an image.
    
    Parameters:
    - image: Input image (BGR format)
    - filter_type: Type of filter ('lowpass', 'highpass')
    - cutoff: Cutoff frequency
    
    Returns:
    - Filtered image
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Perform FFT
    dft = cv2.dft(np.float32(gray), flags=cv2.DFT_COMPLEX_OUTPUT)
    dft_shift = np.fft.fftshift(dft)
    
    rows, cols = gray.shape
    crow, ccol = rows // 2, cols // 2
    
    # Create mask
    mask = np.zeros((rows, cols, 2), np.uint8)
    
    if filter_type == 'lowpass':
        cv2.circle(mask, (ccol, crow), cutoff, (1, 1), -1)
    elif filter_type == 'highpass':
        mask[:] = 1
        cv2.circle(mask, (ccol, crow), cutoff, (0, 0), -1)
    
    # Apply mask
    fshift = dft_shift * mask
    
    # Inverse FFT
    f_ishift = np.fft.ifftshift(fshift)
    img_back = cv2.idft(f_ishift)
    img_back = cv2.magnitude(img_back[:, :, 0], img_back[:, :, 1])
    
    # Normalize
    img_back = cv2.normalize(img_back, None, 0, 255, cv2.NORM_MINMAX)
    img_back = np.uint8(img_back)
    
    return img_back