import cv2
import numpy as np
from sklearn.decomposition import PCA

def apply_pca(image, n_components=50):
    """
    Apply PCA to reduce dimensionality of image and reconstruct.
    
    Parameters:
    - image: Input image in BGR format
    - n_components: Number of principal components
    
    Returns:
    - Reconstructed image after PCA
    """
    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Reshape for PCA
    original_shape = gray.shape
    data = gray.reshape(-1, gray.shape[1])
    
    # Ensure n_components doesn't exceed data dimensions
    n_components = min(n_components, min(data.shape))
    
    # Apply PCA
    pca = PCA(n_components=n_components)
    transformed = pca.fit_transform(data)
    reconstructed = pca.inverse_transform(transformed)
    
    # Reshape back
    reconstructed = reconstructed.reshape(original_shape)
    reconstructed = np.uint8(np.clip(reconstructed, 0, 255))
    
    return reconstructed