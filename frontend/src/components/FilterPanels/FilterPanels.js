import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import './FilterPanels.css';
import { imageAPI } from '../../api';
import { addToHistory } from '../../store/actions/historyActions';

const FilterPanels = ({ imageId }) => {
  const dispatch = useDispatch();
  const [activePanel, setActivePanel] = useState('spatial');
  const [loading, setLoading] = useState(false);

  // Spatial domain controls
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(1.0);
  const [blurRadius, setBlurRadius] = useState(5);

  // Morphological controls
  const [morphOperation, setMorphOperation] = useState('erode');
  const [kernelSize, setKernelSize] = useState(5);
  const [cannyThreshold1, setCannyThreshold1] = useState(100);
  const [cannyThreshold2, setCannyThreshold2] = useState(200);

  // Frequency domain controls
  const [filterType, setFilterType] = useState('lowpass');
  const [cutoffFreq, setCutoffFreq] = useState(30);
  const [compressionQuality, setCompressionQuality] = useState(80);

  const applyFilter = async (filterName, params) => {
    if (!imageId || loading) return;

    try {
      setLoading(true);
      let response;

      switch (filterName) {
        case 'brightness':
          response = await imageAPI.adjustBrightness(imageId, { value: params.brightness });
          break;
        case 'contrast':
          response = await imageAPI.adjustContrast(imageId, { factor: params.contrast });
          break;
        case 'blur':
          response = await imageAPI.applyGaussianBlur(imageId, { radius: params.radius });
          break;
        case 'histogram':
          response = await imageAPI.equalizeHistogram(imageId);
          break;
        case 'edge':
          response = await imageAPI.detectEdges(imageId, { method: 'sobel' });
          break;
        case 'morph':
          response = await imageAPI.applyMorphology(imageId, { 
            operation: params.operation,
            kernel_size: params.kernelSize 
          });
          break;
        case 'canny':
          response = await imageAPI.cannyEdge(imageId, {
            threshold1: params.threshold1,
            threshold2: params.threshold2
          });
          break;
        case 'harris':
          response = await imageAPI.harrisCorner(imageId);
          break;
        case 'hough':
          response = await imageAPI.houghTransform(imageId);
          break;
        case 'fourier':
          response = await imageAPI.fourierTransform(imageId);
          break;
        case 'frequency':
          response = await imageAPI.applyFrequencyFilter(imageId, {
            filter_type: params.filterType,
            cutoff: params.cutoff
          });
          break;
        case 'compress':
          response = await imageAPI.compressImage(imageId, { quality: params.quality });
          break;
        case 'face':
          response = await imageAPI.detectFaces(imageId);
          break;
        case 'sift':
          response = await imageAPI.extractSIFT(imageId);
          break;
        case 'pca':
          response = await imageAPI.applyPCA(imageId);
          break;
        default:
          return;
      }

      dispatch(addToHistory({
        id: Date.now(),
        operation: filterName,
        params: params,
        timestamp: new Date().toISOString()
      }));

      alert(`${filterName} filter applied successfully!`);
    } catch (error) {
      console.error('Filter error:', error);
      alert(`Failed to apply ${filterName} filter`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="filter-panels">
      <div className="panel-tabs">
        <button 
          className={activePanel === 'spatial' ? 'active' : ''}
          onClick={() => setActivePanel('spatial')}
        >
          Spatial
        </button>
        <button 
          className={activePanel === 'morphological' ? 'active' : ''}
          onClick={() => setActivePanel('morphological')}
        >
          Morphological
        </button>
        <button 
          className={activePanel === 'frequency' ? 'active' : ''}
          onClick={() => setActivePanel('frequency')}
        >
          Frequency
        </button>
        <button 
          className={activePanel === 'ml' ? 'active' : ''}
          onClick={() => setActivePanel('ml')}
        >
          ML Features
        </button>
      </div>

      <div className="panel-content">
        {activePanel === 'spatial' && (
          <div className="filter-group">
            <h4>Spatial Domain Filters</h4>
            
            <div className="control">
              <label>Brightness: {brightness}</label>
              <input
                type="range"
                min="-100"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('brightness', { brightness })}>
                Apply
              </button>
            </div>

            <div className="control">
              <label>Contrast: {contrast.toFixed(2)}</label>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={contrast}
                onChange={(e) => setContrast(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('contrast', { contrast })}>
                Apply
              </button>
            </div>

            <div className="control">
              <label>Gaussian Blur: {blurRadius}px</label>
              <input
                type="range"
                min="1"
                max="25"
                value={blurRadius}
                onChange={(e) => setBlurRadius(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('blur', { radius: blurRadius })}>
                Apply
              </button>
            </div>

            <button 
              className="action-btn"
              onClick={() => applyFilter('histogram', {})}
            >
              Histogram Equalization
            </button>

            <button 
              className="action-btn"
              onClick={() => applyFilter('edge', {})}
            >
              Edge Detection (Sobel)
            </button>
          </div>
        )}

        {activePanel === 'morphological' && (
          <div className="filter-group">
            <h4>Morphological Operations</h4>
            
            <div className="control">
              <label>Operation:</label>
              <select 
                value={morphOperation}
                onChange={(e) => setMorphOperation(e.target.value)}
              >
                <option value="erode">Erode</option>
                <option value="dilate">Dilate</option>
                <option value="open">Opening</option>
                <option value="close">Closing</option>
                <option value="gradient">Gradient</option>
              </select>
            </div>

            <div className="control">
              <label>Kernel Size: {kernelSize}</label>
              <input
                type="range"
                min="3"
                max="15"
                step="2"
                value={kernelSize}
                onChange={(e) => setKernelSize(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('morph', { operation: morphOperation, kernelSize })}>
                Apply
              </button>
            </div>

            <div className="control">
              <label>Canny Edge Detection</label>
              <input
                type="number"
                placeholder="Threshold 1"
                value={cannyThreshold1}
                onChange={(e) => setCannyThreshold1(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Threshold 2"
                value={cannyThreshold2}
                onChange={(e) => setCannyThreshold2(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('canny', { threshold1: cannyThreshold1, threshold2: cannyThreshold2 })}>
                Apply Canny
              </button>
            </div>

            <button 
              className="action-btn"
              onClick={() => applyFilter('harris', {})}
            >
              Harris Corner Detection
            </button>

            <button 
              className="action-btn"
              onClick={() => applyFilter('hough', {})}
            >
              Hough Transform
            </button>
          </div>
        )}

        {activePanel === 'frequency' && (
          <div className="filter-group">
            <h4>Frequency Domain Filters</h4>
            
            <button 
              className="action-btn"
              onClick={() => applyFilter('fourier', {})}
            >
              Fourier Transform
            </button>

            <div className="control">
              <label>Filter Type:</label>
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="lowpass">Low Pass</option>
                <option value="highpass">High Pass</option>
                <option value="bandpass">Band Pass</option>
              </select>
            </div>

            <div className="control">
              <label>Cutoff Frequency: {cutoffFreq}</label>
              <input
                type="range"
                min="10"
                max="100"
                value={cutoffFreq}
                onChange={(e) => setCutoffFreq(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('frequency', { filterType, cutoff: cutoffFreq })}>
                Apply
              </button>
            </div>

            <div className="control">
              <label>Compression Quality: {compressionQuality}%</label>
              <input
                type="range"
                min="10"
                max="100"
                value={compressionQuality}
                onChange={(e) => setCompressionQuality(Number(e.target.value))}
              />
              <button onClick={() => applyFilter('compress', { quality: compressionQuality })}>
                Compress
              </button>
            </div>
          </div>
        )}

        {activePanel === 'ml' && (
          <div className="filter-group">
            <h4>ML-Based Features</h4>
            
            <button 
              className="action-btn"
              onClick={() => applyFilter('face', {})}
            >
              Face Detection
            </button>

            <button 
              className="action-btn"
              onClick={() => applyFilter('sift', {})}
            >
              SIFT Feature Extraction
            </button>

            <button 
              className="action-btn"
              onClick={() => applyFilter('pca', {})}
            >
              PCA Analysis
            </button>
          </div>
        )}
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Processing...</p>
        </div>
      )}
    </div>
  );
};

export default FilterPanels;
