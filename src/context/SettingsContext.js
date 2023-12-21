// src/context/SettingsContext.js
import { createContext, useContext, useState } from 'react';

export const SettingsContext = createContext();

export const useSettings = () => {
  return useContext(SettingsContext);
};

export const SettingsProvider = ({ children }) => {
  const [openaiApiKey, setOpenaiApiKey] = useState('');

  return (
    <SettingsContext.Provider value={{ openaiApiKey, setOpenaiApiKey }}>
      {children}
    </SettingsContext.Provider>
  );
};
