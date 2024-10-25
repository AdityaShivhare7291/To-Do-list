import React, { useEffect } from 'react';
import './boxes.css';
import './progress.css';

const Progress = () => {
  useEffect(() => {
    const setProgress = (percentage) => {
      const progressBar = document.querySelector('.progress-1-bar');
      if (progressBar) progressBar.style.width = `${percentage}%`;
    };
    setProgress(60);
  }, []);

  return (
    <div className="progress-1-container">
      <p>Weekly Progress</p>
      <br />
      <div className="progress-1-limiter">
        <div class="progress-1-bar"></div>
      </div>
    </div>
  );
};

export default Progress;
