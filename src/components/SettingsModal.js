// src/components/SettingsModal.js
import React from 'react';
import { useSettings } from '../context/SettingsContext';

const SettingsModal = ({ onClose }) => {
  const { openaiApiKey, setOpenaiApiKey } = useSettings();

  const handleApiKeyChange = (e) => {
    setOpenaiApiKey(e.target.value);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>OpenAI Settings</h2>
        <label htmlFor="apiKeyInput">
          OpenAI API Key:
          <input 
            type="text" 
            id="apiKeyInput" 
            value={openaiApiKey} 
            onChange={handleApiKeyChange} 
            placeholder="Enter your OpenAI API Key" 
            required 
          />
        </label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SettingsModal;
