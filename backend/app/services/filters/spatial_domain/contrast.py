from PIL import Image
import numpy as np

def adjust_contrast(image, factor):
    """
    Adjusts the contrast of an image.

    Parameters:
    - image: Input image as a NumPy array.
    - factor: Contrast adjustment factor. 
              A factor of 1.0 returns the original image,
              less than 1.0 decreases contrast,
              and greater than 1.0 increases contrast.

    Returns:
    - Adjusted image as a NumPy array.
    """
    # Convert image to float32 for processing
    img_float = image.astype(np.float32) / 255.0

    # Calculate the mean of the image
    mean = np.mean(img_float)

    # Adjust contrast
    adjusted = (img_float - mean) * factor + mean

    # Clip values to be in the valid range [0, 1]
    adjusted = np.clip(adjusted, 0, 1)

    # Convert back to uint8
    return (adjusted * 255).astype(np.uint8)