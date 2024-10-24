import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';


const App = () => {
  return (
    <div id="mobile-screen">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;