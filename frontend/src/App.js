import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashBoard from './pages/dashboard';
import GetStarted from './pages/getstated';
import ViewAllTasks from './pages/viewAllTasks';

import './App.css';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken-todo'));

  function check() {
    return !!localStorage.getItem('authToken-todo')
  }

  useEffect(() => {
    const handleStorageChange = () => {
      console.log("it runs or not")
      setIsLoggedIn(!!localStorage.getItem('authToken-todo'));
    };

    // Listen for changes in localStorage
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div id="mobile-screen">
      <Routes>
        <Route
          path="/"
          element={check() ? <DashBoard /> : <Navigate to="/getstarted" />}
        />
        <Route path="/getstarted" element={<GetStarted />} />
        <Route path="/dashboard" element={check() ? <DashBoard /> : <Navigate to="/getstarted" />} />
        <Route path="/viewAllTasks" element={check() ? <ViewAllTasks /> : <Navigate to="/getstarted" />} />
      </Routes>
    </div>
  );
};

export default App;
