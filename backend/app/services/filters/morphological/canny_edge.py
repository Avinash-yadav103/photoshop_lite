def apply_canny_edge_detection(image, low_threshold=100, high_threshold=200):
    """
    Applies Canny edge detection to the input image.

    Parameters:
    - image: Input image in which edges are to be detected.
    - low_threshold: Lower threshold for the hysteresis procedure.
    - high_threshold: Upper threshold for the hysteresis procedure.

    Returns:
    - edges: Binary image with detected edges.
    """
    import cv2

    # Convert the image to grayscale
    gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Canny edge detection
    edges = cv2.Canny(gray_image, low_threshold, high_threshold)

    return edges