import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageEditor.css';
import FilterPanels from '../FilterPanels/FilterPanels';
import HistoryPanel from '../HistoryPanel/HistoryPanel';
import { setCurrentImage, setLoading } from '../../store/actions/imageActions';
import { assetAPI, imageAPI } from '../../api';
import { isValidImageFile, fileToBase64 } from '../../utils/fileHelpers';

const ImageEditor = () => {
  const dispatch = useDispatch();
  const { currentImage, loading } = useSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isValidImageFile(file)) {
      alert('Please select a valid image file (JPEG, PNG, GIF, BMP, WebP)');
      return;
    }

    setSelectedFile(file);
    const base64 = await fileToBase64(file);
    setPreviewUrl(base64);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await assetAPI.uploadImage(formData);
      const uploadedImage = response.data;
      
      setImageId(uploadedImage.id);
      dispatch(setCurrentImage(uploadedImage));
      alert('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDownload = async () => {
    if (!imageId) return;

    try {
      const response = await assetAPI.downloadAsset(imageId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `edited_image_${Date.now()}.png`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download image');
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setImageId(null);
    dispatch(setCurrentImage(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-editor">
      <div className="editor-sidebar">
        <div className="upload-section">
          <h3>Upload Image</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            style={{ display: 'none' }}
          />
          <button 
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            Choose File
          </button>
          {selectedFile && (
            <>
              <p className="file-name">{selectedFile.name}</p>
              <button 
                className="btn btn-success"
                onClick={handleUpload}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Upload'}
              </button>
            </>
          )}
        </div>

        {imageId && (
          <>
            <FilterPanels imageId={imageId} />
            <div className="action-buttons">
              <button 
                className="btn btn-download"
                onClick={handleDownload}
              >
                Download
              </button>
              <button 
                className="btn btn-reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </>
        )}
      </div>

      <div className="editor-canvas">
        <div className="canvas-container">
          {previewUrl ? (
            <img 
              src={previewUrl} 
              alt="Preview" 
              className="preview-image"
            />
          ) : (
            <div className="placeholder">
              <i className="icon-image"></i>
              <p>No image loaded</p>
              <p className="hint">Upload an image to start editing</p>
            </div>
          )}
          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </div>
      </div>

      <div className="editor-history">
        <HistoryPanel />
      </div>
    </div>
  );
};

export default ImageEditor;
