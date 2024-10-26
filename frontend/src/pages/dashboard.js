import React, { useState } from 'react';
import SearchBar from '../components/searchbar';
import Slider from '../components/slider';
import Progress from '../components/boxes';
import WorkProgress from '../components/progress';
import TaskList from '../components/taskList/taskList';
import AddIcon from '../static/add.png';
import AddTask from '../components/addtask/addtask';
import EditTask from '../components/edittask/edittask';
import { useSelector, useDispatch } from 'react-redux';
import { close } from '../redux/slice/editslice';
import TaskSearchList from '../components/searchbar';
import SearchTaskList from '../components/searchModal/searchModal';

function DashBoard() {
  const [isAddNewTaskOpen, SetisAddNewTaskOpen] = useState(false);
  const isEditTaskOpen = useSelector((state) => state.editTask.edittask);

  console.log({ isEditTaskOpen });
  const dispatch = useDispatch();

  return (
    <div style={{ padding: '10px' }}>
      <SearchBar />
      {/* <TaskSearchList /> */}
      <SearchTaskList />
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
      <EditTask isOpen={isEditTaskOpen} onClose={() => dispatch(close())} />
    </div>
  );
}

export default DashBoard;
