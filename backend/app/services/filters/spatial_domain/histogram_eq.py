def histogram_equalization(image):
    """
    Applies histogram equalization to the input image to enhance contrast.
    
    Parameters:
        image (numpy.ndarray): Input image in BGR format.
        
    Returns:
        numpy.ndarray: Image after applying histogram equalization.
    """
    # Convert the image to YUV color space
    yuv_image = cv2.cvtColor(image, cv2.COLOR_BGR2YUV)
    
    # Split the channels
    y_channel, u_channel, v_channel = cv2.split(yuv_image)
    
    # Apply histogram equalization to the Y channel
    equalized_y_channel = cv2.equalizeHist(y_channel)
    
    # Merge the channels back
    equalized_yuv_image = cv2.merge((equalized_y_channel, u_channel, v_channel))
    
    # Convert back to BGR color space
    equalized_image = cv2.cvtColor(equalized_yuv_image, cv2.COLOR_YUV2BGR)
    
    return equalized_image