import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HistoryPanel.css';
import { undo, redo, clearHistory } from '../../store/actions/historyActions';

const HistoryPanel = () => {
  const dispatch = useDispatch();
  const { past, present, future } = useSelector((state) => state.history);

  const handleUndo = () => {
    if (past.length > 0) {
      dispatch(undo());
    }
  };

  const handleRedo = () => {
    if (future.length > 0) {
      dispatch(redo());
    }
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      dispatch(clearHistory());
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  };

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>History</h3>
        <button 
          className="clear-btn"
          onClick={handleClear}
          disabled={past.length === 0 && !present}
        >
          Clear
        </button>
      </div>

      <div className="history-controls">
        <button 
          className="control-btn"
          onClick={handleUndo}
          disabled={past.length === 0}
          title="Undo"
        >
          ↶ Undo
        </button>
        <button 
          className="control-btn"
          onClick={handleRedo}
          disabled={future.length === 0}
          title="Redo"
        >
          ↷ Redo
        </button>
      </div>

      <div className="history-list">
        {future.length > 0 && (
          <div className="history-section">
            <p className="section-label">Future</p>
            {future.map((item, index) => (
              <div key={`future-${index}`} className="history-item future-item">
                <span className="operation-name">{item.operation}</span>
                <span className="operation-time">{formatTimestamp(item.timestamp)}</span>
              </div>
            ))}
          </div>
        )}

        {present && (
          <div className="history-section">
            <p className="section-label">Current</p>
            <div className="history-item current-item">
              <span className="operation-name">{present.operation}</span>
              <span className="operation-time">{formatTimestamp(present.timestamp)}</span>
            </div>
          </div>
        )}

        {past.length > 0 && (
          <div className="history-section">
            <p className="section-label">Past</p>
            {[...past].reverse().map((item, index) => (
              <div key={`past-${index}`} className="history-item past-item">
                <span className="operation-name">{item.operation}</span>
                <span className="operation-time">{formatTimestamp(item.timestamp)}</span>
              </div>
            ))}
          </div>
        )}

        {past.length === 0 && !present && future.length === 0 && (
          <div className="empty-state">
            <p>No history yet</p>
            <p className="hint">Edit operations will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
