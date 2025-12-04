import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VideoEditor.css';
import { Icons } from '../Icons';
import { setCurrentVideo, setLoading } from '../../store/actions/videoActions';
import { assetAPI, videoAPI } from '../../api';
import { isValidVideoFile } from '../../utils/fileHelpers';

const VideoEditor = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.video);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(10);
  const [speed, setSpeed] = useState(1.0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

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
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      formData.append('video', selectedFile);

      const response = await assetAPI.uploadVideo(formData);
      const uploadedVideo = response.data;
      
      setVideoId(uploadedVideo.id);
      dispatch(setCurrentVideo(uploadedVideo));
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video: ' + (error.response?.data?.error || error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleTrim = async () => {
    if (!videoId) return;

    try {
      dispatch(setLoading(true));
      await videoAPI.trimVideo(videoId, {
        start_time: trimStart,
        end_time: trimEnd
      });
      alert('Video trimmed successfully!');
    } catch (error) {
      console.error('Trim error:', error);
      alert('Failed to trim video');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSpeedChange = async () => {
    if (!videoId) return;

    try {
      dispatch(setLoading(true));
      await videoAPI.changeSpeed(videoId, { speed });
      alert('Video speed changed successfully!');
    } catch (error) {
      console.error('Speed change error:', error);
      alert('Failed to change video speed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleDownload = async () => {
    if (!videoId) return;

    try {
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
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setVideoId(null);
    setTrimStart(0);
    setTrimEnd(10);
    setSpeed(1.0);
    setCurrentTime(0);
    setDuration(0);
    dispatch(setCurrentVideo(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setTrimEnd(Math.min(10, videoRef.current.duration));
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-editor">
      {/* Left Toolbar */}
      <div className="toolbar-left">
        <div className="toolbar-section">
          <button className="tool-btn" title="Select">
            <Icons.Select size={20} />
          </button>
          <button className="tool-btn" title="Trim">
            <Icons.Trim size={20} />
          </button>
          <button className="tool-btn" title="Speed">
            <Icons.Speed size={20} />
          </button>
          <button 
            className="tool-btn active" 
            title="Upload"
            onClick={() => fileInputRef.current?.click()}
          >
            <Icons.Upload size={20} />
          </button>
          <button className="tool-btn" title="Video">
            <Icons.Video size={20} />
          </button>
        </div>
        
        <div className="toolbar-section bottom">
          <button className="tool-btn" title="Settings">
            <Icons.Settings size={20} />
          </button>
          <button className="tool-btn" title="Filter">
            <Icons.Filter size={20} />
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
            </div>
            <div className="info-center">
              <span className="filename">{selectedFile?.name || 'Untitled'}</span>
            </div>
            <div className="info-right">
              {videoId && (
                <button className="action-icon-btn danger" onClick={handleReset}>
                  <Icons.Trash size={14} /> Delete
                </button>
              )}
            </div>
          </div>
        )}

        {/* Video Preview */}
        <div className="video-preview-container">
          {previewUrl ? (
            <video 
              ref={videoRef}
              src={previewUrl}
              className="video-preview"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <div className="placeholder" onClick={() => fileInputRef.current?.click()}>
              <div className="placeholder-icon">
                <Icons.Video size={64} color="var(--text-muted)" />
              </div>
              <h3>Drop your video here</h3>
              <p>or click to browse</p>
              <button className="browse-btn">Choose File</button>
            </div>
          )}
        </div>

        {/* Timeline */}
        {previewUrl && (
          <div className="timeline-container">
            <div className="timeline-header">
              <div className="timeline-controls">
                <button className="timeline-btn" title="Skip Back">
                  <Icons.SkipBack size={16} />
                </button>
                <button className={`timeline-btn play`} onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                  {isPlaying ? <Icons.Pause size={16} /> : <Icons.Play size={16} />}
                </button>
                <button className="timeline-btn" title="Skip Forward">
                  <Icons.SkipForward size={16} />
                </button>
              </div>
              <div className="time-display">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            <div className="timeline-track">
              <div 
                className="timeline-progress" 
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              />
            </div>
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

      {/* Right Sidebar */}
      <div className="editor-sidebar">
        {videoId ? (
          <>
            <div className="sidebar-section">
              <h4><Icons.Trim size={16} /> Trim Video</h4>
              <div className="control-group">
                <label>Start Time (seconds)</label>
                <input
                  type="number"
                  value={trimStart}
                  onChange={(e) => setTrimStart(Number(e.target.value))}
                  min="0"
                  max={duration}
                  className="number-input"
                />
              </div>
              <div className="control-group">
                <label>End Time (seconds)</label>
                <input
                  type="number"
                  value={trimEnd}
                  onChange={(e) => setTrimEnd(Number(e.target.value))}
                  min={trimStart}
                  max={duration}
                  className="number-input"
                />
              </div>
              <button className="apply-btn" onClick={handleTrim} disabled={loading}>
                Apply Trim
              </button>
            </div>

            <div className="sidebar-section">
              <h4><Icons.Speed size={16} /> Speed Control</h4>
              <div className="control-group">
                <div className="control-header">
                  <label>Playback Speed</label>
                  <span className="control-value">{speed}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
              </div>
              <button className="apply-btn" onClick={handleSpeedChange} disabled={loading}>
                Apply Speed
              </button>
            </div>

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
            <h4>Video Settings</h4>
            <p>Upload a video to access editing tools</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoEditor;
