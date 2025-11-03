# API Documentation for PhotoshopLite

## Overview

This document provides a comprehensive overview of the RESTful API endpoints available in the PhotoshopLite application. The API is designed to facilitate image and video editing functionalities through a web-based interface.

## Base URL

The base URL for all API endpoints is:

```
http://localhost:5000/api
```

## Authentication

### Login

- **Endpoint:** `/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:**
  - **200 OK:** Returns a JWT token for authenticated sessions.
  - **401 Unauthorized:** Invalid credentials.

### Register

- **Endpoint:** `/auth/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "string",
    "password": "string",
    "email": "string"
  }
  ```
- **Response:**
  - **201 Created:** User successfully registered.
  - **400 Bad Request:** Validation errors.

## Image Editing Endpoints

### Upload Image

- **Endpoint:** `/assets/upload`
- **Method:** POST
- **Request Body:** Form-data containing the image file.
- **Response:**
  - **200 OK:** Returns the uploaded image metadata.
  - **400 Bad Request:** Invalid file type or size.

### Apply Filter

- **Endpoint:** `/edits/filter`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "image_id": "string",
    "filter_type": "string",
    "parameters": {
      "brightness": "number",
      "contrast": "number"
    }
  }
  ```
- **Response:**
  - **200 OK:** Returns the edited image.
  - **404 Not Found:** Image not found.

### Get Image Metadata

- **Endpoint:** `/assets/{image_id}`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns image metadata.
  - **404 Not Found:** Image not found.

## Video Editing Endpoints

### Upload Video

- **Endpoint:** `/assets/upload/video`
- **Method:** POST
- **Request Body:** Form-data containing the video file.
- **Response:**
  - **200 OK:** Returns the uploaded video metadata.
  - **400 Bad Request:** Invalid file type or size.

### Trim Video

- **Endpoint:** `/video/trim`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "video_id": "string",
    "start_time": "number",
    "end_time": "number"
  }
  ```
- **Response:**
  - **200 OK:** Returns the trimmed video.
  - **404 Not Found:** Video not found.

### Get Video Metadata

- **Endpoint:** `/assets/video/{video_id}`
- **Method:** GET
- **Response:**
  - **200 OK:** Returns video metadata.
  - **404 Not Found:** Video not found.

## Error Handling

All API responses include a standard error format:

```json
{
  "error": {
    "code": "string",
    "message": "string"
  }
}
```

## Conclusion

This API documentation provides the necessary information to interact with the PhotoshopLite application programmatically. For further details, please refer to the source code or contact the development team.