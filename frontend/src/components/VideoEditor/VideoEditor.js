import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VideoEditor.css';
import { Icons } from '../Icons';
import { setCurrentVideo, setLoading } from '../../store/actions/videoActions';
import { assetAPI, videoAPI } from '../../api';
import { isValidVideoFile } from '../../utils/fileHelpers';

const VideoEditor = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.video);
  
  // File and video state
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  // Timeline and trim state
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(0);
  const [isDraggingTrim, setIsDraggingTrim] = useState(null);
  const [isDraggingPlayhead, setIsDraggingPlayhead] = useState(false);
  
  // Edit settings
  const [speed, setSpeed] = useState(1.0);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [rotation, setRotation] = useState(0);
  
  // Active tool
  const [activeTool, setActiveTool] = useState('select');
  const [activePanel, setActivePanel] = useState('basic');
  
  // Processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  
  // Refs
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const timelineRef = useRef(null);

  // Handle file selection
  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!isValidVideoFile(file)) {
      alert('Please select a valid video file (MP4, AVI, MOV, WebM)');
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setActiveTool('select');
  };

  // Handle video upload
  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      dispatch(setLoading(true));
      setIsProcessing(true);
      setProcessingMessage('Uploading video...');
      
      const formData = new FormData();
      formData.append('video', selectedFile);

      const response = await assetAPI.uploadVideo(formData);
      const uploadedVideo = response.data;
      
      setVideoId(uploadedVideo.id);
      dispatch(setCurrentVideo(uploadedVideo));
      setProcessingMessage('');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
    }
  };

  // Trim video
  const handleTrim = async () => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage('Trimming video...');
      dispatch(setLoading(true));
      
      const response = await videoAPI.trimVideo(videoId, {
        start_time: trimStart,
        end_time: trimEnd
      });
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      alert('Video trimmed successfully!');
    } catch (error) {
      console.error('Trim error:', error);
      alert('Failed to trim video: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Change speed
  const handleSpeedChange = async () => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage(`Changing speed to ${speed}x...`);
      dispatch(setLoading(true));
      
      const response = await videoAPI.changeSpeed(videoId, { speed });
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      alert('Video speed changed successfully!');
    } catch (error) {
      console.error('Speed change error:', error);
      alert('Failed to change video speed: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Apply filter
  const handleApplyFilter = async () => {
    if (!videoId || selectedFilter === 'none') return;

    try {
      setIsProcessing(true);
      setProcessingMessage(`Applying ${selectedFilter} filter...`);
      dispatch(setLoading(true));
      
      const response = await videoAPI.applyFilter(videoId, { filter_type: selectedFilter });
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      alert(`${selectedFilter} filter applied successfully!`);
    } catch (error) {
      console.error('Filter error:', error);
      alert('Failed to apply filter: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Rotate video
  const handleRotate = async (angle) => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage(`Rotating video ${angle}°...`);
      dispatch(setLoading(true));
      
      const response = await videoAPI.rotateVideo(videoId, { angle });
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      setRotation((prev) => (prev + angle) % 360);
      alert('Video rotated successfully!');
    } catch (error) {
      console.error('Rotate error:', error);
      alert('Failed to rotate video: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Adjust volume
  const handleVolumeApply = async () => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage('Adjusting volume...');
      dispatch(setLoading(true));
      
      const response = await videoAPI.adjustVolume(videoId, { volume });
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      alert('Volume adjusted successfully!');
    } catch (error) {
      console.error('Volume error:', error);
      alert('Failed to adjust volume: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Mute video
  const handleMuteVideo = async () => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage('Removing audio...');
      dispatch(setLoading(true));
      
      const response = await videoAPI.muteVideo(videoId);
      
      if (response.data.id) {
        setVideoId(response.data.id);
      }
      alert('Audio removed successfully!');
    } catch (error) {
      console.error('Mute error:', error);
      alert('Failed to remove audio: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Download video
  const handleDownload = async () => {
    if (!videoId) return;

    try {
      setIsProcessing(true);
      setProcessingMessage('Preparing download...');
      
      const response = await assetAPI.downloadAsset(videoId);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `edited_video_${Date.now()}.mp4`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download video');
    } finally {
      setIsProcessing(false);
      setProcessingMessage('');
    }
  };

  // Reset editor
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setVideoId(null);
    setTrimStart(0);
    setTrimEnd(0);
    setSpeed(1.0);
    setCurrentTime(0);
    setDuration(0);
    setSelectedFilter('none');
    setRotation(0);
    setVolume(1);
    setActiveTool('select');
    dispatch(setCurrentVideo(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Toggle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  // Handle loaded metadata
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const videoDuration = videoRef.current.duration;
      setDuration(videoDuration);
      setTrimEnd(videoDuration);
    }
  };

  // Format time
  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 100);
    return `${mins}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  // Seek to time
  const seekToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Skip forward/backward
  const skipTime = (seconds) => {
    if (videoRef.current) {
      const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
      seekToTime(newTime);
    }
  };

  // Handle timeline click
  const handleTimelineClick = (e) => {
    if (!timelineRef.current || !duration) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    seekToTime(newTime);
  };

  // Handle trim handle drag
  const handleTrimDrag = useCallback((e) => {
    if (!isDraggingTrim || !timelineRef.current || !duration) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    if (isDraggingTrim === 'start') {
      setTrimStart(Math.min(newTime, trimEnd - 0.1));
    } else if (isDraggingTrim === 'end') {
      setTrimEnd(Math.max(newTime, trimStart + 0.1));
    }
  }, [isDraggingTrim, duration, trimEnd, trimStart]);

  const handleTrimDragEnd = useCallback(() => {
    setIsDraggingTrim(null);
  }, []);

  useEffect(() => {
    if (isDraggingTrim) {
      window.addEventListener('mousemove', handleTrimDrag);
      window.addEventListener('mouseup', handleTrimDragEnd);
      return () => {
        window.removeEventListener('mousemove', handleTrimDrag);
        window.removeEventListener('mouseup', handleTrimDragEnd);
      };
    }
  }, [isDraggingTrim, handleTrimDrag, handleTrimDragEnd]);

  // Handle playhead drag
  const handlePlayheadDrag = useCallback((e) => {
    if (!isDraggingPlayhead || !timelineRef.current || !duration) return;
    
    const rect = timelineRef.current.getBoundingClientRect();
    const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const percentage = clickX / rect.width;
    const newTime = percentage * duration;
    
    seekToTime(newTime);
  }, [isDraggingPlayhead, duration]);

  const handlePlayheadDragEnd = useCallback(() => {
    setIsDraggingPlayhead(false);
  }, []);

  useEffect(() => {
    if (isDraggingPlayhead) {
      window.addEventListener('mousemove', handlePlayheadDrag);
      window.addEventListener('mouseup', handlePlayheadDragEnd);
      return () => {
        window.removeEventListener('mousemove', handlePlayheadDrag);
        window.removeEventListener('mouseup', handlePlayheadDragEnd);
      };
    }
  }, [isDraggingPlayhead, handlePlayheadDrag, handlePlayheadDragEnd]);

  // Generate timeline markers
  const generateTimelineMarkers = () => {
    if (!duration) return [];
    const markers = [];
    const interval = duration <= 30 ? 5 : duration <= 120 ? 15 : 30;
    for (let i = 0; i <= duration; i += interval) {
      markers.push(i);
    }
    return markers;
  };

  // Tool buttons config
  const toolButtons = [
    { id: 'select', icon: Icons.Select, title: 'Select Tool' },
    { id: 'trim', icon: Icons.Trim, title: 'Trim Tool' },
    { id: 'speed', icon: Icons.Speed, title: 'Speed Control' },
    { id: 'filter', icon: Icons.Filter, title: 'Video Filters' },
    { id: 'audio', icon: Icons.Volume, title: 'Audio Controls' },
  ];

  const filterOptions = [
    { value: 'none', label: 'None' },
    { value: 'grayscale', label: 'Grayscale' },
    { value: 'sepia', label: 'Sepia' },
    { value: 'invert', label: 'Invert' },
    { value: 'mirror_h', label: 'Mirror H' },
    { value: 'mirror_v', label: 'Mirror V' },
  ];

  const speedPresets = [0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 2.0];

  return (
    <div className="video-editor">
      {/* Left Toolbar */}
      <div className="toolbar-left">
        <div className="toolbar-section">
          {toolButtons.map((tool) => (
            <button
              key={tool.id}
              className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
              title={tool.title}
              onClick={() => {
                setActiveTool(tool.id);
                if (tool.id === 'trim') setActivePanel('trim');
                else if (tool.id === 'speed') setActivePanel('basic');
                else if (tool.id === 'filter') setActivePanel('effects');
                else if (tool.id === 'audio') setActivePanel('basic');
                else setActivePanel('basic');
              }}
              disabled={!videoId && tool.id !== 'select'}
            >
              <tool.icon size={20} />
            </button>
          ))}
          
          <div className="toolbar-divider" />
          
          <button 
            className="tool-btn"
            title="Upload Video"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icons.Upload size={20} />
          </button>
        </div>
        
        <div className="toolbar-section bottom">
          <button className="tool-btn" title="Settings">
            <Icons.Settings size={20} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="editor-main">
        {/* Info Bar */}
        {previewUrl && (
          <div className="info-bar">
            <div className="info-left">
              {selectedFile && !videoId && (
                <button className="upload-btn" onClick={handleUpload} disabled={loading}>
                  <Icons.Upload size={16} />
                  {loading ? 'Uploading...' : 'Upload to Edit'}
                </button>
              )}
              {videoId && (
                <span className="status-badge success">Ready to Edit</span>
              )}
            </div>
            <div className="info-center">
              <span className="filename">{selectedFile?.name || 'Untitled'}</span>
            </div>
            <div className="info-right">
              {videoId && (
                <>
                  <button className="action-icon-btn" onClick={handleDownload}>
                    <Icons.Download size={14} /> Export
                  </button>
                  <button className="action-icon-btn danger" onClick={handleReset}>
                    <Icons.Trash size={14} /> Reset
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Video Preview */}
        <div className="video-preview-container">
          {previewUrl ? (
            <div className="video-wrapper">
              <video 
                ref={videoRef}
                src={previewUrl}
                className="video-preview"
                style={{ transform: `rotate(${rotation}deg)` }}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
                onClick={togglePlay}
              />
              {!isPlaying && (
                <div className="play-overlay" onClick={togglePlay}>
                  <div className="play-button-large">
                    <Icons.Play size={48} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="placeholder" onClick={() => fileInputRef.current?.click()}>
              <div className="placeholder-icon">
                <Icons.Video size={64} color="var(--text-muted)" />
              </div>
              <h3>Drop your video here</h3>
              <p>or click to browse</p>
              <button className="browse-btn">Choose File</button>
              <div className="supported-formats">
                Supported: MP4, AVI, MOV, WebM
              </div>
            </div>
          )}
        </div>

        {/* Professional Timeline */}
        {previewUrl && (
          <div className="timeline-panel">
            {/* Transport Controls */}
            <div className="transport-controls">
              <div className="transport-left">
                <button 
                  className="transport-btn" 
                  onClick={() => seekToTime(0)}
                  title="Go to Start"
                >
                  <Icons.SkipBack size={16} />
                </button>
                <button 
                  className="transport-btn" 
                  onClick={() => skipTime(-5)}
                  title="Back 5s"
                >
                  <Icons.Rewind size={16} />
                </button>
                <button 
                  className={`transport-btn play-btn ${isPlaying ? 'playing' : ''}`}
                  onClick={togglePlay}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Icons.Pause size={20} /> : <Icons.Play size={20} />}
                </button>
                <button 
                  className="transport-btn" 
                  onClick={() => skipTime(5)}
                  title="Forward 5s"
                >
                  <Icons.FastForward size={16} />
                </button>
                <button 
                  className="transport-btn" 
                  onClick={() => seekToTime(duration)}
                  title="Go to End"
                >
                  <Icons.SkipForward size={16} />
                </button>
              </div>
              
              <div className="transport-center">
                <div className="time-display-pro">
                  <span className="current-time">{formatTime(currentTime)}</span>
                  <span className="time-separator">/</span>
                  <span className="total-time">{formatTime(duration)}</span>
                </div>
              </div>
              
              <div className="transport-right">
                <div className="volume-control">
                  <button 
                    className="transport-btn"
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (videoRef.current) {
                        videoRef.current.muted = !isMuted;
                      }
                    }}
                  >
                    {isMuted || volume === 0 ? <Icons.VolumeX size={16} /> : <Icons.Volume size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      setVolume(val);
                      if (videoRef.current) {
                        videoRef.current.volume = val;
                      }
                      if (val > 0) setIsMuted(false);
                    }}
                    className="volume-slider"
                  />
                </div>
                
                <div className="speed-indicator">
                  <span>{speed}x</span>
                </div>
              </div>
            </div>

            {/* Timeline Ruler */}
            <div className="timeline-ruler">
              {generateTimelineMarkers().map((time) => (
                <div 
                  key={time}
                  className="ruler-mark"
                  style={{ left: `${(time / duration) * 100}%` }}
                >
                  <span className="ruler-label">{formatTime(time)}</span>
                </div>
              ))}
            </div>

            {/* Main Timeline Track */}
            <div 
              className="timeline-track-container"
              ref={timelineRef}
              onClick={handleTimelineClick}
            >
              {/* Video Track */}
              <div className="video-track">
                <div className="track-label">
                  <Icons.Video size={14} />
                  <span>Video</span>
                </div>
                <div className="track-content">
                  {/* Trim Region */}
                  {activeTool === 'trim' && (
                    <>
                      <div 
                        className="trim-region"
                        style={{
                          left: `${(trimStart / duration) * 100}%`,
                          width: `${((trimEnd - trimStart) / duration) * 100}%`
                        }}
                      />
                      <div 
                        className="trim-handle trim-start"
                        style={{ left: `${(trimStart / duration) * 100}%` }}
                        onMouseDown={() => setIsDraggingTrim('start')}
                      >
                        <div className="trim-handle-bar" />
                      </div>
                      <div 
                        className="trim-handle trim-end"
                        style={{ left: `${(trimEnd / duration) * 100}%` }}
                        onMouseDown={() => setIsDraggingTrim('end')}
                      >
                        <div className="trim-handle-bar" />
                      </div>
                    </>
                  )}
                  
                  {/* Video Thumbnail Strip */}
                  <div className="video-strip">
                    <div 
                      className="video-strip-fill"
                      style={{ background: 'var(--accent-gradient)' }}
                    />
                  </div>
                </div>
              </div>

              {/* Audio Track */}
              <div className="audio-track">
                <div className="track-label">
                  <Icons.Volume size={14} />
                  <span>Audio</span>
                </div>
                <div className="track-content">
                  <div className="audio-waveform">
                    {/* Simulated waveform visualization */}
                    {Array.from({ length: 100 }).map((_, i) => (
                      <div 
                        key={i}
                        className="waveform-bar"
                        style={{ 
                          height: `${20 + Math.random() * 60}%`,
                          opacity: currentTime / duration > i / 100 ? 1 : 0.4
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Playhead */}
              <div 
                className="playhead"
                style={{ left: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                onMouseDown={() => setIsDraggingPlayhead(true)}
              >
                <div className="playhead-head" />
                <div className="playhead-line" />
              </div>
            </div>

            {/* Trim Info */}
            {activeTool === 'trim' && videoId && (
              <div className="trim-info-bar">
                <div className="trim-info">
                  <span className="trim-label">In:</span>
                  <input
                    type="number"
                    value={trimStart.toFixed(2)}
                    onChange={(e) => setTrimStart(Math.max(0, parseFloat(e.target.value) || 0))}
                    step="0.1"
                    min="0"
                    max={trimEnd - 0.1}
                    className="trim-input"
                  />
                </div>
                <div className="trim-info">
                  <span className="trim-label">Out:</span>
                  <input
                    type="number"
                    value={trimEnd.toFixed(2)}
                    onChange={(e) => setTrimEnd(Math.min(duration, parseFloat(e.target.value) || duration))}
                    step="0.1"
                    min={trimStart + 0.1}
                    max={duration}
                    className="trim-input"
                  />
                </div>
                <div className="trim-info">
                  <span className="trim-label">Duration:</span>
                  <span className="trim-value">{formatTime(trimEnd - trimStart)}</span>
                </div>
                <button 
                  className="trim-apply-btn"
                  onClick={handleTrim}
                  disabled={loading || isProcessing}
                >
                  <Icons.Trim size={14} />
                  Apply Trim
                </button>
              </div>
            )}
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="video/*"
          style={{ display: 'none' }}
        />
      </div>

      {/* Right Sidebar - Tool Panels */}
      <div className="editor-sidebar">
        {videoId ? (
          <>
            {/* Panel Tabs */}
            <div className="panel-tabs">
              <button 
                className={`panel-tab ${activePanel === 'basic' ? 'active' : ''}`}
                onClick={() => setActivePanel('basic')}
              >
                Basic
              </button>
              <button 
                className={`panel-tab ${activePanel === 'trim' ? 'active' : ''}`}
                onClick={() => { setActivePanel('trim'); setActiveTool('trim'); }}
              >
                Trim
              </button>
              <button 
                className={`panel-tab ${activePanel === 'effects' ? 'active' : ''}`}
                onClick={() => setActivePanel('effects')}
              >
                Effects
              </button>
            </div>

            {/* Basic Panel */}
            {activePanel === 'basic' && (
              <div className="panel-content">
                <div className="sidebar-section">
                  <h4><Icons.Speed size={16} /> Playback Speed</h4>
                  <div className="speed-presets">
                    {speedPresets.map((preset) => (
                      <button
                        key={preset}
                        className={`speed-preset ${speed === preset ? 'active' : ''}`}
                        onClick={() => setSpeed(preset)}
                      >
                        {preset}x
                      </button>
                    ))}
                  </div>
                  <div className="control-group">
                    <div className="control-header">
                      <label>Custom Speed</label>
                      <span className="control-value">{speed}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.25"
                      max="4.0"
                      step="0.25"
                      value={speed}
                      onChange={(e) => setSpeed(Number(e.target.value))}
                    />
                  </div>
                  <button 
                    className="apply-btn" 
                    onClick={handleSpeedChange} 
                    disabled={loading || isProcessing}
                  >
                    Apply Speed Change
                  </button>
                </div>

                <div className="sidebar-section">
                  <h4><Icons.Volume size={16} /> Audio</h4>
                  <div className="control-group">
                    <div className="control-header">
                      <label>Volume</label>
                      <span className="control-value">{Math.round(volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="0.1"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                    />
                  </div>
                  <div className="audio-buttons">
                    <button 
                      className="apply-btn secondary" 
                      onClick={handleVolumeApply}
                      disabled={loading || isProcessing}
                    >
                      Apply Volume
                    </button>
                    <button 
                      className="apply-btn danger" 
                      onClick={handleMuteVideo}
                      disabled={loading || isProcessing}
                    >
                      <Icons.VolumeX size={14} /> Remove Audio
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Trim Panel */}
            {activePanel === 'trim' && (
              <div className="panel-content">
                <div className="sidebar-section">
                  <h4><Icons.Trim size={16} /> Trim Settings</h4>
                  <p className="panel-description">
                    Drag the handles on the timeline or enter exact values below.
                  </p>
                  <div className="control-group">
                    <label>Start Time (seconds)</label>
                    <input
                      type="number"
                      value={trimStart.toFixed(2)}
                      onChange={(e) => setTrimStart(Math.max(0, parseFloat(e.target.value) || 0))}
                      min="0"
                      max={trimEnd - 0.1}
                      step="0.1"
                      className="number-input"
                    />
                  </div>
                  <div className="control-group">
                    <label>End Time (seconds)</label>
                    <input
                      type="number"
                      value={trimEnd.toFixed(2)}
                      onChange={(e) => setTrimEnd(Math.min(duration, parseFloat(e.target.value) || duration))}
                      min={trimStart + 0.1}
                      max={duration}
                      step="0.1"
                      className="number-input"
                    />
                  </div>
                  <div className="trim-summary">
                    <div className="trim-stat">
                      <span>Original</span>
                      <strong>{formatTime(duration)}</strong>
                    </div>
                    <div className="trim-stat">
                      <span>New Duration</span>
                      <strong>{formatTime(trimEnd - trimStart)}</strong>
                    </div>
                    <div className="trim-stat">
                      <span>Removed</span>
                      <strong>{formatTime(duration - (trimEnd - trimStart))}</strong>
                    </div>
                  </div>
                  <button 
                    className="apply-btn primary" 
                    onClick={handleTrim} 
                    disabled={loading || isProcessing}
                  >
                    <Icons.Trim size={16} /> Apply Trim
                  </button>
                </div>

                <div className="sidebar-section">
                  <h4>Quick Actions</h4>
                  <div className="quick-trim-buttons">
                    <button 
                      className="quick-btn"
                      onClick={() => { setTrimStart(currentTime); }}
                    >
                      Set In Point
                    </button>
                    <button 
                      className="quick-btn"
                      onClick={() => { setTrimEnd(currentTime); }}
                    >
                      Set Out Point
                    </button>
                    <button 
                      className="quick-btn"
                      onClick={() => { setTrimStart(0); setTrimEnd(duration); }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Effects Panel */}
            {activePanel === 'effects' && (
              <div className="panel-content">
                <div className="sidebar-section">
                  <h4><Icons.Filter size={16} /> Video Filters</h4>
                  <div className="filter-grid">
                    {filterOptions.map((filter) => (
                      <button
                        key={filter.value}
                        className={`filter-btn ${selectedFilter === filter.value ? 'active' : ''}`}
                        onClick={() => setSelectedFilter(filter.value)}
                      >
                        <div className="filter-preview">
                          <Icons.Filter size={20} />
                        </div>
                        <span>{filter.label}</span>
                      </button>
                    ))}
                  </div>
                  <button 
                    className="apply-btn" 
                    onClick={handleApplyFilter}
                    disabled={loading || isProcessing || selectedFilter === 'none'}
                  >
                    Apply Filter
                  </button>
                </div>

                <div className="sidebar-section">
                  <h4><Icons.Rotate size={16} /> Transform</h4>
                  <div className="transform-buttons">
                    <button 
                      className="transform-btn"
                      onClick={() => handleRotate(90)}
                      disabled={loading || isProcessing}
                    >
                      <Icons.Rotate size={20} />
                      <span>Rotate 90°</span>
                    </button>
                    <button 
                      className="transform-btn"
                      onClick={() => handleRotate(-90)}
                      disabled={loading || isProcessing}
                    >
                      <Icons.Rotate size={20} />
                      <span>Rotate -90°</span>
                    </button>
                    <button 
                      className="transform-btn"
                      onClick={() => handleRotate(180)}
                      disabled={loading || isProcessing}
                    >
                      <Icons.Rotate size={20} />
                      <span>Flip 180°</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-cancel" onClick={handleReset}>
                Cancel
              </button>
              <button className="btn btn-save" onClick={handleDownload}>
                <Icons.Download size={16} /> Export
              </button>
            </div>
          </>
        ) : (
          <div className="sidebar-placeholder">
            <div className="placeholder-icon">
              <Icons.Settings size={48} color="var(--text-muted)" />
            </div>
            <h4>Video Settings</h4>
            <p>Upload a video to access editing tools</p>
            <div className="features-list">
              <div className="feature-item">
                <Icons.Trim size={16} />
                <span>Trim & Cut</span>
              </div>
              <div className="feature-item">
                <Icons.Speed size={16} />
                <span>Speed Control</span>
              </div>
              <div className="feature-item">
                <Icons.Filter size={16} />
                <span>Filters & Effects</span>
              </div>
              <div className="feature-item">
                <Icons.Volume size={16} />
                <span>Audio Control</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="loading-overlay">
          <div className="spinner" />
          <p>{processingMessage || 'Processing...'}</p>
        </div>
      )}
    </div>
  );
};

export default VideoEditor;
