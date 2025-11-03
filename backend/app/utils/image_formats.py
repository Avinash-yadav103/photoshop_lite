def convert_image_format(image, target_format):
    """
    Converts an image to the specified format.

    Parameters:
    - image: The input image (as a NumPy array).
    - target_format: The desired format to convert to (e.g., 'JPEG', 'PNG', 'BMP').

    Returns:
    - The converted image as a NumPy array.
    """
    if target_format not in ['JPEG', 'PNG', 'BMP']:
        raise ValueError("Unsupported target format. Use 'JPEG', 'PNG', or 'BMP'.")

    # Convert the image to the desired format
    if target_format == 'JPEG':
        return cv2.cvtColor(image, cv2.COLOR_BGR2RGB)  # Convert to RGB for JPEG
    elif target_format == 'PNG':
        return cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)  # Convert to RGBA for PNG
    elif target_format == 'BMP':
        return image  # BMP format is the same as BGR in OpenCV

def save_image(image, filename, format):
    """
    Saves an image to a file in the specified format.

    Parameters:
    - image: The image to save (as a NumPy array).
    - filename: The name of the file to save the image to.
    - format: The format to save the image in (e.g., 'JPEG', 'PNG', 'BMP').
    """
    if format not in ['JPEG', 'PNG', 'BMP']:
        raise ValueError("Unsupported format. Use 'JPEG', 'PNG', or 'BMP'.")

    cv2.imwrite(f"{filename}.{format.lower()}", image)

def load_image(filename):
    """
    Loads an image from a file.

    Parameters:
    - filename: The name of the file to load the image from.

    Returns:
    - The loaded image as a NumPy array.
    """
    image = cv2.imread(filename)
    if image is None:
        raise FileNotFoundError(f"Image file '{filename}' not found.")
    return image