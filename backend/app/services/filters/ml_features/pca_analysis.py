from sklearn.decomposition import PCA
import numpy as np

def perform_pca(data, n_components=2):
    """
    Perform PCA on the given data.

    Parameters:
    - data: np.ndarray, input data for PCA (shape: [n_samples, n_features])
    - n_components: int, number of principal components to return

    Returns:
    - transformed_data: np.ndarray, data projected onto the principal components
    - explained_variance: np.ndarray, variance explained by each principal component
    """
    pca = PCA(n_components=n_components)
    transformed_data = pca.fit_transform(data)
    explained_variance = pca.explained_variance_ratio_

    return transformed_data, explained_variance

def reconstruct_data(transformed_data, pca):
    """
    Reconstruct original data from PCA transformed data.

    Parameters:
    - transformed_data: np.ndarray, data projected onto the principal components
    - pca: PCA object, fitted PCA model

    Returns:
    - reconstructed_data: np.ndarray, reconstructed original data
    """
    reconstructed_data = pca.inverse_transform(transformed_data)
    return reconstructed_data