import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './ImageEditor.css';
import FilterPanels from '../FilterPanels/FilterPanels';
import HistoryPanel from '../HistoryPanel/HistoryPanel';
import { Icons } from '../Icons';
import { setCurrentImage, setLoading } from '../../store/actions/imageActions';
import { assetAPI, imageAPI } from '../../api';
import { isValidImageFile, fileToBase64 } from '../../utils/fileHelpers';

const ImageEditor = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.image);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [zoom, setZoom] = useState(100);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [showHistory, setShowHistory] = useState(false);
  const [isCropping, setIsCropping] = useState(false);
  const [cropStart, setCropStart] = useState(null);
  const [cropEnd, setCropEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

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
    
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
    };
    img.src = base64;
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
    setZoom(100);
    setImageDimensions({ width: 0, height: 0 });
    setIsCropping(false);
    setCropStart(null);
    setCropEnd(null);
    dispatch(setCurrentImage(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Crop handlers
  const handleCropToggle = () => {
    if (!imageId) {
      alert('Please upload an image first to use crop');
      return;
    }
    setIsCropping(!isCropping);
    setCropStart(null);
    setCropEnd(null);
  };

  const handleMouseDown = (e) => {
    if (!isCropping || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / (zoom / 100);
    const y = (e.clientY - rect.top) / (zoom / 100);
    
    setCropStart({ x, y });
    setCropEnd({ x, y });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !isCropping || !imageRef.current) return;
    
    const rect = imageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min((e.clientX - rect.left) / (zoom / 100), imageDimensions.width));
    const y = Math.max(0, Math.min((e.clientY - rect.top) / (zoom / 100), imageDimensions.height));
    
    setCropEnd({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getCropRect = () => {
    if (!cropStart || !cropEnd) return null;
    
    const x = Math.min(cropStart.x, cropEnd.x);
    const y = Math.min(cropStart.y, cropEnd.y);
    const width = Math.abs(cropEnd.x - cropStart.x);
    const height = Math.abs(cropEnd.y - cropStart.y);
    
    return { x: Math.round(x), y: Math.round(y), width: Math.round(width), height: Math.round(height) };
  };

  const applyCrop = async () => {
    const cropRect = getCropRect();
    if (!cropRect || cropRect.width < 10 || cropRect.height < 10) {
      alert('Please select a larger area to crop');
      return;
    }

    try {
      dispatch(setLoading(true));
      const response = await imageAPI.cropImage(imageId, cropRect);
      
      if (response.data.image) {
        setPreviewUrl(response.data.image);
        setImageDimensions({
          width: response.data.dimensions.cropped.width,
          height: response.data.dimensions.cropped.height
        });
      }
      
      if (response.data.id) {
        setImageId(response.data.id);
      }
      
      setIsCropping(false);
      setCropStart(null);
      setCropEnd(null);
    } catch (error) {
      console.error('Crop error:', error);
      alert('Failed to crop image');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const cancelCrop = () => {
    setIsCropping(false);
    setCropStart(null);
    setCropEnd(null);
  };

  return (
    <div className="image-editor">
      {/* Left Toolbar */}
      <div className="toolbar-left">
        <div className="toolbar-section">
          <button className="tool-btn" title="Select">
            <Icons.Select size={20} />
          </button>
          <button className="tool-btn" title="Layers">
            <Icons.Layers size={20} />
          </button>
          <button className="tool-btn" title="Text">
            <Icons.Text size={20} />
          </button>
          <button 
            className="tool-btn active" 
            title="Upload"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icons.Upload size={20} />
          </button>
          <button className="tool-btn" title="Files">
            <Icons.File size={20} />
          </button>
        </div>
        
        <div className="toolbar-section bottom">
          <button className="tool-btn" title="Settings">
            <Icons.Settings size={20} />
          </button>
          <button 
            className={`tool-btn ${showHistory ? 'active' : ''}`} 
            title="History"
            onClick={() => setShowHistory(!showHistory)}
          >
            <Icons.History size={20} />
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="editor-main">
        {previewUrl && (
          <div className="info-bar">
            <div className="info-left">
              <span className="dimension-badge">
                {imageDimensions.width} x {imageDimensions.height}
              </span>
              {selectedFile && !imageId && (
                <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                  <Icons.Upload size={16} />
                  {loading ? 'Uploading...' : 'Upload to Edit'}
                </button>
              )}
            </div>
            <div className="info-center">
              <span className="filename">{selectedFile?.name || 'Untitled'}</span>
            </div>
            <div className="info-right">
              {imageId && (
                <>
                  <button className="action-icon-btn" title="Duplicate">
                    <Icons.Duplicate size={14} /> Duplicate
                  </button>
                  <button className="action-icon-btn" onClick={handleReset} title="Reset">
                    <Icons.Reset size={14} /> Reset
                  </button>
                  <button className="action-icon-btn danger" onClick={handleReset} title="Delete">
                    <Icons.Trash size={14} /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <div className="editor-canvas">
          <div className="canvas-container">
            {previewUrl ? (
              <div 
                className={`image-wrapper ${isCropping ? 'cropping' : ''}`} 
                style={{ transform: `scale(${zoom / 100})` }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <img 
                  ref={imageRef}
                  src={previewUrl} 
                  alt="Preview" 
                  className="preview-image" 
                  draggable={false}
                />
                {isCropping && cropStart && cropEnd && (
                  <>
                    <div 
                      className="crop-overlay"
                      style={{
                        clipPath: `polygon(
                          0 0, 
                          100% 0, 
                          100% 100%, 
                          0 100%, 
                          0 0,
                          ${Math.min(cropStart.x, cropEnd.x)}px ${Math.min(cropStart.y, cropEnd.y)}px,
                          ${Math.min(cropStart.x, cropEnd.x)}px ${Math.max(cropStart.y, cropEnd.y)}px,
                          ${Math.max(cropStart.x, cropEnd.x)}px ${Math.max(cropStart.y, cropEnd.y)}px,
                          ${Math.max(cropStart.x, cropEnd.x)}px ${Math.min(cropStart.y, cropEnd.y)}px,
                          ${Math.min(cropStart.x, cropEnd.x)}px ${Math.min(cropStart.y, cropEnd.y)}px
                        )`
                      }}
                    />
                    <div 
                      className="crop-selection"
                      style={{
                        left: Math.min(cropStart.x, cropEnd.x),
                        top: Math.min(cropStart.y, cropEnd.y),
                        width: Math.abs(cropEnd.x - cropStart.x),
                        height: Math.abs(cropEnd.y - cropStart.y)
                      }}
                    >
                      <div className="crop-dimensions">
                        {Math.round(Math.abs(cropEnd.x - cropStart.x))} x {Math.round(Math.abs(cropEnd.y - cropStart.y))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="placeholder" onClick={() => fileInputRef.current?.click()}>
                <div className="placeholder-icon">
                  <Icons.Image size={64} color="var(--text-muted)" />
                </div>
                <h3>Drop your image here</h3>
                <p>or click to browse</p>
                <button className="browse-btn">Choose File</button>
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
          </div>
        </div>

        {previewUrl && (
          <div className="bottom-controls">
            <div className="canvas-actions">
              {isCropping ? (
                <>
                  <button className="canvas-btn primary" onClick={applyCrop} disabled={!cropStart || !cropEnd}>
                    <Icons.Check size={16} /> Apply Crop
                  </button>
                  <button className="canvas-btn" onClick={cancelCrop}>
                    <Icons.Close size={16} /> Cancel
                  </button>
                  {getCropRect() && (
                    <span className="crop-info">
                      Selection: {getCropRect()?.width} x {getCropRect()?.height}
                    </span>
                  )}
                </>
              ) : (
                <>
                  <button className={`canvas-btn ${isCropping ? 'active' : ''}`} onClick={handleCropToggle}>
                    <Icons.Crop size={16} /> Crop
                  </button>
                  <button className="canvas-btn">
                    <Icons.Fullscreen size={16} /> Full Screen
                  </button>
                </>
              )}
            </div>
            
            <div className="zoom-control">
              <span className="zoom-label">Zoom</span>
              <input
                type="range"
                min="25"
                max="200"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="zoom-slider"
              />
              <span className="zoom-value">{zoom}%</span>
            </div>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Right Panel - Filters & Settings */}
      <div className="editor-sidebar">
        {imageId ? (
          <>
            <FilterPanels 
              imageId={imageId} 
              onImageUpdate={(base64Image) => {
                setPreviewUrl(base64Image);
                // Update dimensions from new image
                const img = new Image();
                img.onload = () => {
                  setImageDimensions({ width: img.width, height: img.height });
                };
                img.src = base64Image;
              }}
              onImageIdChange={(newId) => setImageId(newId)}
            />
            <div className="action-buttons">
              <button className="btn btn-cancel" onClick={handleReset}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={handleDownload}>
                <Icons.Download size={16} /> Save
              </button>
            </div>
          </>
        ) : (
          <div className="sidebar-placeholder">
            <div className="placeholder-icon">
              <Icons.Settings size={48} color="var(--text-muted)" />
            </div>
            <h4>Settings</h4>
            <p>Upload an image to access editing tools</p>
          </div>
        )}
      </div>

      {/* History Panel - Toggleable */}
      {showHistory && (
        <div className="history-drawer">
          <div className="history-drawer-header">
            <h3><Icons.History size={18} /> History</h3>
            <button className="close-btn" onClick={() => setShowHistory(false)}>
              <Icons.Close size={18} />
            </button>
          </div>
          <HistoryPanel />
        </div>
      )}
    </div>
  );
};

export default ImageEditor;
