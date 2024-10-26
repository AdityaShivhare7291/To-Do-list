import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import GetStarted from './pages/getstated';
import ViewAllTasks from './pages/viewAllTasks';

import './App.css';

const App = () => {
  const isLoggedIn = true;

  return (
    <div id="mobile-screen">
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <DashBoard /> : <Navigate to="/GetStarted" />}
        />

        <Route path="/GetStarted" element={<GetStarted />} />

        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/viewAllTasks" element={<ViewAllTasks />} />

        {/* <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </div>
  );
};

export default App;
