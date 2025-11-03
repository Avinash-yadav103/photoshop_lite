from scipy import ndimage
import numpy as np

def ideal_low_pass_filter(shape, cutoff):
    rows, cols = shape
    crow, ccol = rows // 2, cols // 2
    x = np.linspace(-ccol, ccol - 1, cols)
    y = np.linspace(-crow, crow - 1, rows)
    X, Y = np.meshgrid(x, y)
    radius = np.sqrt(X**2 + Y**2)
    filter_mask = np.where(radius <= cutoff, 1, 0)
    return filter_mask

def butterworth_low_pass_filter(shape, cutoff, order=2):
    rows, cols = shape
    crow, ccol = rows // 2, cols // 2
    x = np.linspace(-ccol, ccol - 1, cols)
    y = np.linspace(-crow, crow - 1, rows)
    X, Y = np.meshgrid(x, y)
    radius = np.sqrt(X**2 + Y**2)
    filter_mask = 1 / (1 + (radius / cutoff)**(2 * order))
    return filter_mask

def gaussian_low_pass_filter(shape, cutoff):
    rows, cols = shape
    crow, ccol = rows // 2, cols // 2
    x = np.linspace(-ccol, ccol - 1, cols)
    y = np.linspace(-crow, crow - 1, rows)
    X, Y = np.meshgrid(x, y)
    radius = np.sqrt(X**2 + Y**2)
    filter_mask = np.exp(-(radius**2) / (2 * (cutoff**2)))
    return filter_mask

def apply_filter(image, filter_mask):
    filtered_image = ndimage.convolve(image, filter_mask, mode='reflect')
    return filtered_image

def frequency_filter(image, filter_type='ideal', cutoff=30, order=2):
    if filter_type == 'ideal':
        filter_mask = ideal_low_pass_filter(image.shape, cutoff)
    elif filter_type == 'butterworth':
        filter_mask = butterworth_low_pass_filter(image.shape, cutoff, order)
    elif filter_type == 'gaussian':
        filter_mask = gaussian_low_pass_filter(image.shape, cutoff)
    else:
        raise ValueError("Unknown filter type: {}".format(filter_type))

    filtered_image = apply_filter(image, filter_mask)
    return filtered_image