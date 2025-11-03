def adjust_brightness(image, value):
    """
    Adjusts the brightness of an image.

    Parameters:
    - image: Input image in BGR format.
    - value: Brightness adjustment value. Positive values increase brightness,
             negative values decrease brightness.

    Returns:
    - Adjusted image in BGR format.
    """
    # Clip the values to be in the valid range [0, 255]
    adjusted_image = cv2.convertScaleAbs(image, alpha=1, beta=value)
    return adjusted_image