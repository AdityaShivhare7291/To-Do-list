import React, { useEffect } from 'react';
import './boxes/boxes.css';
import './progress.css';
import { useSelector } from 'react-redux';

const Progress = () => {
  const progress = useSelector((state) => state.analyticTask.progresspercent);

  useEffect(() => {
    const setProgress = (percentage) => {
      console.log('progress runs', { percentage });
      const progressBar = document.querySelector('.progress-1-bar');
      if (progressBar) progressBar.style.width = `${percentage}%`;
    };
    setProgress(progress);
  }, [progress]);

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
