import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HistoryPanel.css';
import { Icons } from '../Icons';

const HistoryPanel = () => {
  const { history, currentIndex } = useSelector((state) => state.history);
  const dispatch = useDispatch();

  const getIconForOperation = (operation) => {
    const iconMap = {
      'brightness': <Icons.Brightness size={16} />,
      'contrast': <Icons.Contrast size={16} />,
      'blur': <Icons.Blur size={16} />,
      'edge': <Icons.EdgeDetection size={16} />,
      'face': <Icons.FaceDetection size={16} />,
      'upload': <Icons.Upload size={16} />,
      'filter': <Icons.Filter size={16} />,
      'default': <Icons.History size={16} />
    };
    return iconMap[operation?.toLowerCase()] || iconMap['default'];
  };

  if (!history || history.length === 0) {
    return (
      <div className="history-panel">
        <div className="history-empty">
          <div className="empty-icon">
            <Icons.History size={32} />
          </div>
          <p>No history yet</p>
          <span>Your editing actions will appear here</span>
        </div>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <div className="history-list">
        {history.map((item, index) => (
          <div 
            key={item.id || index}
            className={`history-item ${index === currentIndex ? 'active' : ''} ${index < currentIndex ? 'past' : ''} ${index > currentIndex ? 'future' : ''}`}
          >
            <div className="history-icon">
              {getIconForOperation(item.operation)}
            </div>
            <div className="history-info">
              <span className="history-operation">{item.operation}</span>
              <span className="history-time">
                {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ''}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
