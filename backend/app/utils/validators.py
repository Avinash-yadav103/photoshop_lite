def validate_image_file(file):
    """
    Validates if the uploaded file is a valid image format.
    Supported formats: JPEG, PNG, BMP, GIF.
    """
    allowed_extensions = {'png', 'jpg', 'jpeg', 'bmp', 'gif'}
    if '.' in file.filename:
        extension = file.filename.rsplit('.', 1)[1].lower()
        return extension in allowed_extensions
    return False

def validate_video_file(file):
    """
    Validates if the uploaded file is a valid video format.
    Supported formats: MP4, AVI, MKV, MOV.
    """
    allowed_extensions = {'mp4', 'avi', 'mkv', 'mov'}
    if '.' in file.filename:
        extension = file.filename.rsplit('.', 1)[1].lower()
        return extension in allowed_extensions
    return False

def validate_user_input(data):
    """
    Validates user input data for required fields.
    Ensures that all necessary fields are present and correctly formatted.
    """
    required_fields = ['username', 'email', 'password']
    for field in required_fields:
        if field not in data or not data[field]:
            return False
    return True

def validate_project_data(data):
    """
    Validates project data for required fields.
    Ensures that all necessary fields are present and correctly formatted.
    """
    required_fields = ['project_name', 'description']
    for field in required_fields:
        if field not in data or not data[field]:
            return False
    return True