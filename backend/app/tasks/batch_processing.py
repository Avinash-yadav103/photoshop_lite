from celery import Celery
from app.services.image_service import process_image
import os

# Initialize Celery
celery = Celery('tasks', broker='redis://localhost:6379/0')

@celery.task
def batch_process_images(image_paths, output_directory):
    """
    Processes a batch of images by applying specified filters and saving the results.

    :param image_paths: List of paths to the images to be processed.
    :param output_directory: Directory where processed images will be saved.
    """
    if not os.path.exists(output_directory):
        os.makedirs(output_directory)

    for image_path in image_paths:
        try:
            # Process the image (this function should be defined in image_service.py)
            processed_image = process_image(image_path)
            # Save the processed image
            output_path = os.path.join(output_directory, os.path.basename(image_path))
            processed_image.save(output_path)
        except Exception as e:
            print(f"Error processing {image_path}: {e}")