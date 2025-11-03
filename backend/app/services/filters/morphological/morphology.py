def morphological_operations(image, operation, kernel_size=3):
    """
    Applies morphological operations to the given image.

    Parameters:
    - image: Input image on which to perform the operation.
    - operation: The morphological operation to perform ('dilate', 'erode', 'open', 'close').
    - kernel_size: Size of the structuring element (default is 3).

    Returns:
    - The processed image after applying the morphological operation.
    """
    import cv2
    import numpy as np

    # Create a structuring element
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_size, kernel_size))

    if operation == 'dilate':
        return cv2.dilate(image, kernel)
    elif operation == 'erode':
        return cv2.erode(image, kernel)
    elif operation == 'open':
        return cv2.morphologyEx(image, cv2.MORPH_OPEN, kernel)
    elif operation == 'close':
        return cv2.morphologyEx(image, cv2.MORPH_CLOSE, kernel)
    else:
        raise ValueError("Invalid operation. Choose from 'dilate', 'erode', 'open', 'close'.")