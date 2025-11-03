def apply_sobel_edge_detection(image, threshold=50):
    """
    Implements Sobel edge detection as per CSET344 Module I curriculum
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Sobel operators (as taught in course)
    sobel_x = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=3)
    sobel_y = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=3)
    
    # Magnitude calculation
    magnitude = np.sqrt(sobel_x**2 + sobel_y**2)
    
    # Apply threshold
    edges = np.uint8(magnitude > threshold) * 255
    
    return edges

def apply_prewitt_edge_detection(image):
    """
    Implements Prewitt edge detection
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    kernel_x = np.array([[ -1, 0, 1],
                          [ -1, 0, 1],
                          [ -1, 0, 1]])
    
    kernel_y = np.array([[ 1, 1, 1],
                          [ 0, 0, 0],
                          [ -1, -1, -1]])
    
    edges_x = cv2.filter2D(gray, -1, kernel_x)
    edges_y = cv2.filter2D(gray, -1, kernel_y)
    
    edges = np.sqrt(edges_x**2 + edges_y**2)
    edges = np.uint8(edges)
    
    return edges

def apply_laplacian_edge_detection(image):
    """
    Implements Laplacian edge detection
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    laplacian = cv2.Laplacian(gray, cv2.CV_64F)
    edges = np.uint8(np.absolute(laplacian))
    
    return edges

def apply_canny_edge_detection(image, low_threshold=100, high_threshold=200):
    """
    Implements Canny edge detection
    """
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, low_threshold, high_threshold)
    
    return edges