// src/components/ErrorComponent.js
import React from 'react';

const ErrorComponent = ({ message }) => (
  <div className="error-container">
    <h2>Error:</h2>
    {message ? <p>{message}</p> : <p>Something went wrong.</p>}
  </div>
);

export default ErrorComponent;
