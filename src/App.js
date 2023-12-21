// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './context/SettingsContext';
import RecommendationForm from './components/RecommendationForm';
import SettingsModal from './components/SettingsModal';

const App = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  const handleClose = () => {
    setIsSettingsOpen(false);
  };

  return (
    <SettingsProvider>
      <Router>
        <div className="container">
          {isSettingsOpen && <SettingsModal onClose={handleClose} />}
          <Routes>
            <Route path="/" element={<RecommendationForm onSettingsClick={handleSettingsClick} />} />
          </Routes>
        </div>
      </Router>
    </SettingsProvider>
  );
};

export default App;
