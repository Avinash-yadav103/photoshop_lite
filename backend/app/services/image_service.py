from PIL import Image
import numpy as np
import cv2

def open_image(image_path):
    """Open an image file and return it as a PIL Image."""
    return Image.open(image_path)

def save_image(image, save_path):
    """Save a PIL Image to the specified path."""
    image.save(save_path)

def convert_to_array(image):
    """Convert a PIL Image to a NumPy array."""
    return np.array(image)

def convert_to_pil(image_array):
    """Convert a NumPy array to a PIL Image."""
    return Image.fromarray(image_array)

def resize_image(image, width, height):
    """Resize the image to the specified width and height."""
    return image.resize((width, height), Image.ANTIALIAS)

def adjust_brightness(image, factor):
    """Adjust the brightness of the image by a given factor."""
    enhancer = ImageEnhance.Brightness(image)
    return enhancer.enhance(factor)

def adjust_contrast(image, factor):
    """Adjust the contrast of the image by a given factor."""
    enhancer = ImageEnhance.Contrast(image)
    return enhancer.enhance(factor)

def apply_filter(image, filter_type):
    """Apply a specified filter to the image."""
    if filter_type == 'grayscale':
        return image.convert('L')
    elif filter_type == 'invert':
        return Image.eval(image, lambda x: 255 - x)
    # Add more filters as needed

def crop_image(image, left, upper, right, lower):
    """Crop the image to the specified box."""
    return image.crop((left, upper, right, lower))

def rotate_image(image, angle):
    """Rotate the image by the specified angle."""
    return image.rotate(angle, expand=True)

def flip_image(image, direction='horizontal'):
    """Flip the image in the specified direction."""
    if direction == 'horizontal':
        return image.transpose(Image.FLIP_LEFT_RIGHT)
    elif direction == 'vertical':
        return image.transpose(Image.FLIP_TOP_BOTTOM)

def convert_color_space(image, color_space):
    """Convert the image to a specified color space."""
    if color_space == 'HSV':
        return image.convert('HSV')
    elif color_space == 'CMYK':
        return image.convert('CMYK')
    # Add more color spaces as needed

def save_image_with_format(image, save_path, format):
    """Save the image in a specified format."""
    image.save(save_path, format=format)