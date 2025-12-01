import React, { useState } from 'react';
import './App.css';
import ImageEditor from './components/ImageEditor/ImageEditor';
import VideoEditor from './components/VideoEditor/VideoEditor';

function App() {
  const [activeTab, setActiveTab] = useState('image'); // 'image' or 'video'

  return (
    <div className="App">
      <header className="App-header">
        <h1>PhotoshopLite</h1>
        <p>Professional Image & Video Editing Software</p>
        <div className="tab-switcher">
          <button
            className={activeTab === 'image' ? 'active' : ''}
            onClick={() => setActiveTab('image')}
          >
            Image Editor
          </button>
          <button
            className={activeTab === 'video' ? 'active' : ''}
            onClick={() => setActiveTab('video')}
          >
            Video Editor
          </button>
        </div>
      </header>
      <main className="App-main">
        {activeTab === 'image' ? <ImageEditor /> : <VideoEditor />}
      </main>
    </div>
  );
}

export default App;
