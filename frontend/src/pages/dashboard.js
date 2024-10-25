import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import Slider from '../components/slider';
import Progress from '../components/boxes';
import WorkProgress from '../components/progress';
import TaskList from '../components/taskList/taskList';
import AddIcon from '../static/add.png';
import AddTask from '../components/addtask/addtask';

function DashBoard() {
  const [isAddNewTaskOpen, SetisAddNewTaskOpen] = useState(false);

  const handleAddNewTaskSubmit = () => {
    console.log('Close handle add new task');
  };

  return (
    <div style={{ padding: '10px' }}>
      <SearchBar />
      <Slider />
      <br />
      <Progress />
      <br />
      <WorkProgress />
      <br />
      <TaskList />
      <br />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '76px',
            height: '76px',
            borderRadius: '100%',
            backgroundColor: '#4566EC',
          }}
        >
          <img
            src={AddIcon}
            alt="Right Image"
            onClick={() => {
              SetisAddNewTaskOpen(true);
            }}
            style={{
              position: 'relative',
              left: '50%',
              top: '50%',
              width: '19px',
              height: '19px',
              transform: 'translate(-50%,-50%)',
            }}
          />
        </div>
      </div>
      <AddTask
        isOpen={isAddNewTaskOpen}
        onClose={() => SetisAddNewTaskOpen(false)}
      />
    </div>
  );
}

export default DashBoard;
