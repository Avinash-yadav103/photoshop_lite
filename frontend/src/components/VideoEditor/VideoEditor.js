import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './VideoEditor.css';
import { setCurrentVideo, setLoading } from '../../store/actions/videoActions';
import { assetAPI, videoAPI } from '../../api';
import { isValidVideoFile } from '../../utils/fileHelpers';

const VideoEditor = () => {
  const dispatch = useDispatch();
  const { currentVideo, loading } = useSelector((state) => state.video);
  const [selectedFile, setSelectedFile] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [trimStart, setTrimStart] = useState(0);
  const [trimEnd, setTrimEnd] = useState(10);
  const [speed, setSpeed] = useState(1.0);
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
      alert('Video uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload video');
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
    dispatch(setCurrentVideo(null));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="video-editor">
      <div className="editor-sidebar">
        <div className="upload-section">
          <h3>Upload Video</h3>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="video/*"
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

        {videoId && (
          <>
            <div className="control-section">
              <h4>Trim Video</h4>
              <label>
                Start (seconds):
                <input
                  type="number"
                  value={trimStart}
                  onChange={(e) => setTrimStart(Number(e.target.value))}
                  min="0"
                />
              </label>
              <label>
                End (seconds):
                <input
                  type="number"
                  value={trimEnd}
                  onChange={(e) => setTrimEnd(Number(e.target.value))}
                  min="0"
                />
              </label>
              <button 
                className="btn btn-action"
                onClick={handleTrim}
                disabled={loading}
              >
                Apply Trim
              </button>
            </div>

            <div className="control-section">
              <h4>Speed Control</h4>
              <label>
                Speed (0.5x - 2.0x):
                <input
                  type="range"
                  min="0.5"
                  max="2.0"
                  step="0.1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                />
                <span className="speed-value">{speed}x</span>
              </label>
              <button 
                className="btn btn-action"
                onClick={handleSpeedChange}
                disabled={loading}
              >
                Apply Speed
              </button>
            </div>

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
        <div className="video-container">
          {previewUrl ? (
            <video 
              ref={videoRef}
              src={previewUrl}
              controls
              className="preview-video"
            />
          ) : (
            <div className="placeholder">
              <i className="icon-video"></i>
              <p>No video loaded</p>
              <p className="hint">Upload a video to start editing</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoEditor;
