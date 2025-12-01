import client from './client';

// Authentication API
export const authAPI = {
  register: (data) => client.post('/auth/register', data),
  login: (data) => client.post('/auth/login', data),
  logout: () => client.post('/auth/logout'),
  getCurrentUser: () => client.get('/auth/me')
};

// Asset Management API
export const assetAPI = {
  uploadImage: (formData) => client.post('/assets/upload/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  uploadVideo: (formData) => client.post('/assets/upload/video', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAssets: (params) => client.get('/assets', { params }),
  getAsset: (id) => client.get(`/assets/${id}`),
  deleteAsset: (id) => client.delete(`/assets/${id}`),
  downloadAsset: (id) => client.get(`/assets/${id}/download`, {
    responseType: 'blob'
  })
};

// Image Editing API
export const imageAPI = {
  // Spatial Domain
  adjustBrightness: (imageId, params) => client.post(`/edits/image/${imageId}/brightness`, params),
  adjustContrast: (imageId, params) => client.post(`/edits/image/${imageId}/contrast`, params),
  applyGaussianBlur: (imageId, params) => client.post(`/edits/image/${imageId}/gaussian-blur`, params),
  applyMedianFilter: (imageId, params) => client.post(`/edits/image/${imageId}/median-filter`, params),
  sharpenImage: (imageId, params) => client.post(`/edits/image/${imageId}/sharpen`, params),
  equalizeHistogram: (imageId) => client.post(`/edits/image/${imageId}/histogram-equalize`),
  detectEdges: (imageId, params) => client.post(`/edits/image/${imageId}/edge-detection`, params),
  
  // Morphological Operations
  applyMorphology: (imageId, params) => client.post(`/edits/image/${imageId}/morphology`, params),
  cannyEdge: (imageId, params) => client.post(`/edits/image/${imageId}/canny-edge`, params),
  harrisCorner: (imageId, params) => client.post(`/edits/image/${imageId}/harris-corner`, params),
  houghTransform: (imageId, params) => client.post(`/edits/image/${imageId}/hough-transform`, params),
  convertColorSpace: (imageId, params) => client.post(`/edits/image/${imageId}/color-space`, params),
  
  // Frequency Domain
  fourierTransform: (imageId) => client.post(`/edits/image/${imageId}/fourier-transform`),
  applyFrequencyFilter: (imageId, params) => client.post(`/edits/image/${imageId}/frequency-filter`, params),
  compressImage: (imageId, params) => client.post(`/edits/image/${imageId}/compress`, params),
  opticalFlow: (imageId, params) => client.post(`/edits/image/${imageId}/optical-flow`, params),
  
  // ML Features
  detectFaces: (imageId) => client.post(`/edits/image/${imageId}/face-detection`),
  extractSIFT: (imageId) => client.post(`/edits/image/${imageId}/sift`),
  extractHOG: (imageId) => client.post(`/edits/image/${imageId}/hog`),
  applyPCA: (imageId, params) => client.post(`/edits/image/${imageId}/pca`, params)
};

// Video Editing API
export const videoAPI = {
  trimVideo: (videoId, params) => client.post(`/edits/video/${videoId}/trim`, params),
  changeSpeed: (videoId, params) => client.post(`/edits/video/${videoId}/speed`, params),
  extractFrames: (videoId, params) => client.post(`/edits/video/${videoId}/extract-frames`, params),
  applyFilter: (videoId, params) => client.post(`/edits/video/${videoId}/filter`, params),
  addWatermark: (videoId, params) => client.post(`/edits/video/${videoId}/watermark`, params),
  mergeVideos: (params) => client.post('/edits/video/merge', params),
  detectMotion: (videoId, params) => client.post(`/edits/video/${videoId}/motion-detection`, params),
  trackObjects: (videoId, params) => client.post(`/edits/video/${videoId}/object-tracking`, params)
};

// Project Management API
export const projectAPI = {
  createProject: (data) => client.post('/projects', data),
  getProjects: (params) => client.get('/projects', { params }),
  getProject: (id) => client.get(`/projects/${id}`),
  updateProject: (id, data) => client.put(`/projects/${id}`, data),
  deleteProject: (id) => client.delete(`/projects/${id}`),
  addAssetToProject: (projectId, assetId) => client.post(`/projects/${projectId}/assets/${assetId}`),
  removeAssetFromProject: (projectId, assetId) => client.delete(`/projects/${projectId}/assets/${assetId}`)
};
