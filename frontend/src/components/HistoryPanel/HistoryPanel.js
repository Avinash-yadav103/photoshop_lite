import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './HistoryPanel.css';
import { Icons } from '../Icons';
import { goToHistory } from '../../store/actions/historyActions';

const HistoryPanel = ({ onHistorySelect }) => {
  const dispatch = useDispatch();
  
  // Get the entire history slice from Redux
  const historySlice = useSelector((state) => {
    console.log('Redux state.history:', state.history);
    return state.history;
  });
  
  // Extract history array and currentIndex with defaults
  const historyItems = historySlice?.history || [];
  const currentIndex = historySlice?.currentIndex ?? -1;

  console.log('HistoryPanel render - items:', historyItems.length, 'currentIndex:', currentIndex);

  // Safe icon renderer
  const getIconForOperation = (operation) => {
    if (!operation) return <Icons.History size={16} />;
    
    const op = operation.toLowerCase();
    
    if (op.includes('brightness')) return <Icons.Brightness size={16} />;
    if (op.includes('contrast')) return <Icons.Contrast size={16} />;
    if (op.includes('blur') || op.includes('sharpen')) return <Icons.Blur size={16} />;
    if (op.includes('edge') || op.includes('canny') || op.includes('harris') || op.includes('hough')) return <Icons.EdgeDetection size={16} />;
    if (op.includes('face')) return <Icons.FaceDetection size={16} />;
    if (op.includes('upload')) return <Icons.Upload size={16} />;
    if (op.includes('crop')) return <Icons.Crop size={16} />;
    if (op.includes('morph') || op.includes('erode') || op.includes('dilate')) return <Icons.Morphology size={16} />;
    if (op.includes('fourier') || op.includes('frequency')) return <Icons.Frequency size={16} />;
    if (op.includes('sift') || op.includes('pca') || op.includes('hog') || op.includes('ml')) return <Icons.ML size={16} />;
    if (op.includes('filter')) return <Icons.Filter size={16} />;
    if (op.includes('saturation')) return <Icons.Saturation size={16} />;
    if (op.includes('exposure')) return <Icons.Exposure size={16} />;
    if (op.includes('histogram')) return <Icons.Contrast size={16} />;
    
    return <Icons.History size={16} />;
  };

  const handleHistoryClick = (index) => {
    console.log('Clicking history item:', index, historyItems[index]);
    if (index === currentIndex) return;
    
    dispatch(goToHistory(index));
    
    // Call the callback to restore the image state
    if (onHistorySelect && historyItems[index]) {
      onHistorySelect(historyItems[index]);
    }
  };

  // Empty state
  if (historyItems.length === 0) {
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

  // Render history list
  return (
    <div className="history-panel">
      <div className="history-list">
        {historyItems.map((item, index) => (
          <div 
            key={item.id || index}
            className={`history-item ${index === currentIndex ? 'active' : ''}`}
            onClick={() => handleHistoryClick(index)}
          >
            <div className="history-icon">
              {getIconForOperation(item.operation)}
            </div>
            <div className="history-info">
              <span className="history-operation">{item.operation || 'Unknown'}</span>
              <span className="history-time">
                {item.timestamp ? new Date(item.timestamp).toLocaleTimeString() : ''}
              </span>
            </div>
            {index === currentIndex && (
              <div className="history-current-marker">●</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;
