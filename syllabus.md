# CSET344: Image and Video Processing — Syllabus (README)

## Course metadata

| Field | Value |
| --- | --- |
| Name of Program | B.Tech. (CSE) |
| Course Code / Title | CSET344 — Image and Video Processing |
| L–T–P–C | 2–0–2–3 |
| Owning School / Department | School of Computer Science Engineering and Technology |
| Pre-requisites / Exposure | – |

## Course Outcomes (COs)

On completion of this course, students will be able to:

| CO | Course Outcome Statement | Bloom’s Taxonomy Level |
| --- | --- | --- |
| CO1 | Apply fundamental concepts of image formation, sampling, quantization, and spatial domain enhancement techniques. | Apply (Level 3) |
| CO2 | Analyze and implement edge detection, morphological operations, and texture/shape-based image analysis techniques. | Analyze (Level 4) |
| CO3 | Demonstrate understanding of color models, binary image operations, and feature extraction techniques for object and shape detection. | Understand/Apply (Level 2 / Level 3) |
| CO4 | Apply frequency domain techniques, including Fourier transforms and optical flow, for image enhancement and motion analysis. | Apply (Level 3) |
| CO5 | Evaluate image and video compression standards, and implement recognition tasks using PCA, HOG, SIFT, and machine-learning-based methods. | Evaluate (Level 5) |

## CO–PO/PSO mapping

| CO \ PO | PO1 | PO2 | PO3 | PO4 | PO5 | PO6 | PO7 | PO8 | PO9 | PO10 | PO11 | PSO1 | PSO2 | PSO3 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| CO1 | 3 | 2 | 1 | - | 3 | - | - | - | - | - | 2 | 2 | 2 | - |
| CO2 | 3 | 3 | 2 | 2 | 3 | - | - | - | - | - | 2 | 3 | 3 | - |
| CO3 | 2 | 2 | 2 | - | 3 | - | - | - | - | - | 2 | 2 | 3 | - |
| CO4 | 3 | 2 | 2 | 2 | 3 | - | - | - | - | - | 2 | 3 | 2 | - |
| CO5 | 3 | 2 | 3 | 2 | 3 | - | - | - | 2 | 2 | 3 | 3 | 3 | 3 |

Legend: 3 – Strongly Mapped | 2 – Moderately Mapped | 1 – Weakly Mapped | - – Not Mapped

## Course contents

### Module I — 8 lecture hours

- Applications of Digital Image Processing; elements of digital image processing systems
- Sampling and quantization
- Neighbours of a pixel, adjacency, connectivity; regions and boundaries; distance measures
- Grayscale to binary image using thresholding
- Image enhancement in the spatial domain
- Gray-level transforms; histogram processing and histogram equalization
- Enhancement using spatial filters; concept of convolution
- Smoothing filters: mean, median, Gaussian
- Edge detection: Prewitt, Sobel, Laplace, Laplacian of Gaussian (LoG)

### Module II — 7 lecture hours

- Canny edge detector; Harris corner detector
- Color models: RGB, HSV, YCbCr; pseudocolor image processing; color transforms; color-to-grayscale conversion
- Handling binary images
- Line detection using Hough transform (polar form); circle detection
- Morphological operations: dilation, erosion, opening, closing
- Boundary detection; hole filling; connected components; hit-and-miss transform
- Shape representation using moments
- Texture analysis: from histogram; from GLCM matrices

### Module III — 8 lecture hours

- Motion detection; concept of optical flow; optical flow equation; Lucas–Kanade method
- Image enhancement in the frequency domain
- 1-D and 2-D Fourier Transform and their inverse
- Low-pass and high-pass filtering: ideal, Butterworth, Gaussian filters
- Homomorphic filtering
- Image compression fundamentals
- Lossless compression models: run-length encoding, Huffman coding
- Lossy compression: discrete cosine transform (DCT), quantization, zigzag coding
- Color image compression; text recognition; feature detection; integral image formation

### Module IV — 7 lecture hours

- Face detection — Viola–Jones method; face recognition
- Principal Component Analysis (PCA); concept of eigenfaces
- Feature detection for ML applications; SIFT and HOG parameters
- Video processing: formation, sampling
- Motion estimation; motion-compensated (MC) filtering; frame-rate conversion
- Video coding and compression; frame-based compression (MPEG)
- Salient object detection; human action recognition from videos
- Depth cameras — Kinect camera data capture; RGB-D data

## Studio work / Laboratory experiments

Lab work includes image enhancement, zooming, cropping, restoration, compression, and segmentation, implemented using MATLAB and OpenCV with Python.

## Text books

1. Szeliski, Richard. Computer Vision: Algorithms and Applications (2nd ed.). Springer, 2022. ISBN: 978-3030343712.
2. Jain, K. Fundamentals of Digital Image Processing (1st ed.). Pearson Education India, 2015. ISBN: 978-9332551916.

## Reference books

1. Bovik, A. C. Handbook of Image and Video Processing (1st ed.). Academic Press, 2010. ISBN: 9780121197902.
2. Kim, B. G. Digital Signal, Image and Video Processing for Emerging Multimedia Technology. Electronics (1st ed.). MDPI AG, 2021. ISBN: 978-3039438570.
3. Vyas, A., Yu, S., and Paik, J. Fundamentals of Digital Image Processing. In Multiscale Transforms with Application to Image Processing (1st ed.). Springer, 2018. ISBN: 978-9811356131.

## Assessment scheme

| Component | Weightage (%) |
| --- | --- |
| Internal Assessment | 40 |
| Mid Term Exam | 20 |
| End Exam | 40 |
| Total | 100 |

