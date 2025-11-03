from cv2 import calcOpticalFlowFarneback, cv2
import numpy as np

def calculate_optical_flow(prev_frame, next_frame):
    """
    Calculate the dense optical flow using the Farneback method.
    
    Parameters:
    - prev_frame: The previous frame (grayscale image).
    - next_frame: The next frame (grayscale image).
    
    Returns:
    - flow: A 2D array representing the flow vectors.
    """
    # Convert frames to float32
    prev_frame = np.float32(prev_frame)
    next_frame = np.float32(next_frame)

    # Calculate optical flow
    flow = calcOpticalFlowFarneback(prev_frame, next_frame, None, 0.5, 3, 15, 3, 5, 1.2, 0)

    return flow

def draw_optical_flow(flow, frame, step=16):
    """
    Draw the optical flow vectors on the frame.
    
    Parameters:
    - flow: The flow vectors.
    - frame: The original frame (BGR image).
    - step: The step size for drawing arrows.
    
    Returns:
    - output_frame: The frame with optical flow vectors drawn.
    """
    h, w = frame.shape[:2]
    y, x = np.mgrid[step//2:h:step, step//2:w:step].reshape(2, -1).astype(int)
    fx, fy = flow[y, x].T

    output_frame = frame.copy()
    for (x1, y1, x2, y2) in zip(x, y, x + fx, y + fy):
        cv2.arrowedLine(output_frame, (x1, y1), (int(x2), int(y2)), (0, 255, 0), 1, tipLength=0.2)

    return output_frame