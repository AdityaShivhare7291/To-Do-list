import React from 'react';
import './taskList.css';
import TaskBar from '../taskBar/taskbar';

function TaskList() {
  const items = [
    'hello',
    'jai mata di',
    'om namaah shivaay',
    'om om om',
    'Ram ram ram',
  ];

  const fourElement = () => {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(<TaskBar task={items[i]} />);
    }
    return arr;
  };

  return (
    <div>
      <div className="task-container-1">
        <p style={{ fontSize: '18px', fontWeight: '600' }}>Tasks Today</p>
        <p style={{ fontSize: '11px', fontWeight: '400', color: 'blue' }}>
          View All
        </p>
      </div>
      <div>{fourElement()}</div>
    </div>
  );
}

export default TaskList;
