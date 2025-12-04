import React, { useState, useEffect } from 'react';
import './App.css';
import ImageEditor from './components/ImageEditor/ImageEditor';
import VideoEditor from './components/VideoEditor/VideoEditor';

function App() {
  const [activeTab, setActiveTab] = useState('image');
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-left">
          <h1>📷 PhotoshopLite</h1>
        </div>
        
        <div className="header-center">
          <div className="tab-switcher">
            <button
              className={activeTab === 'image' ? 'active' : ''}
              onClick={() => setActiveTab('image')}
            >
              🖼️ Image Editor
            </button>
            <button
              className={activeTab === 'video' ? 'active' : ''}
              onClick={() => setActiveTab('video')}
            >
              🎬 Video Editor
            </button>
          </div>
        </div>

        <div className="header-right">
          <button className="theme-toggle" onClick={toggleTheme}>
            <span className="icon">{theme === 'light' ? '🌙' : '☀️'}</span>
            {theme === 'light' ? 'Dark' : 'Light'}
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
