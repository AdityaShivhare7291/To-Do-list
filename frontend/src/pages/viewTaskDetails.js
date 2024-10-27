import React from 'react';
import {
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaStickyNote,
  FaTasks,
} from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function TaskDetails() {
  const location = useLocation();
  const { task } = location.state || {};
  const { title, description, date, startTime, endTime, User, status } = task;

  // Format date and time
  const formatDate = (dateObj) => new Date(dateObj).toLocaleDateString();
  const formatTime = (timeObj) =>
    new Date(timeObj).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  const statusColors = {
    open: '#FFA500', // Orange for open tasks
    progress: '#1E90FF', // Blue for in-progress tasks
    complete: '#32CD32', // Green for completed tasks
  };

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '12px',
        padding: '20px',
        width: '320px',
        backgroundColor: '#ffffff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
        margin: '20px auto',
      }}
    >
      <h2 style={{ margin: '0 0 10px', color: '#333' }}>{title}</h2>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <FaStickyNote style={{ color: '#888', marginRight: '8px' }} />
        <p style={{ margin: 0, color: '#555' }}>{description}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <FaCalendarAlt style={{ color: '#888', marginRight: '8px' }} />
        <p style={{ margin: 0, color: '#555' }}>{formatDate(date)}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <FaClock style={{ color: '#888', marginRight: '8px' }} />
        <p style={{ margin: 0, color: '#555' }}>
          Start: {formatTime(startTime)} - End: {formatTime(endTime)}
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0' }}>
        <FaUser style={{ color: '#888', marginRight: '8px' }} />
        <p style={{ margin: 0, color: '#555' }}>User ID: {User}</p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '15px' }}>
        <FaTasks style={{ color: '#888', marginRight: '8px' }} />
        <p
          style={{
            margin: 0,
            fontWeight: 'bold',
            color: statusColors[status],
            textTransform: 'capitalize',
          }}
        >
          {status}
        </p>
      </div>
    </div>
  );
}

export default TaskDetails;
