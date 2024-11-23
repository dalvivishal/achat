import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const AppWrapper = () => {
  return (
    <Router v7_startTransition v7_relativeSplatPath>
      <App />
    </Router>
  );
};

export default AppWrapper;
