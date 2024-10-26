import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Trash from '../../static/trash-2.png';
import Edit from '../../static/edit.png';
import './taskbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../redux/slice/editslice';

const TaskBar = ({ task, deleteTask, checked }) => {
  console.log({ task });


  const dispatch = useDispatch();



  return (
    <div>
      <div className="task-checkbox">
        <Checkbox
          checked={checked}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div style={{ display: 'inline-block' }} className="task-title">
        <p
          style={{ fontFamily: 'poppins', fontSize: '14px', fontWeight: '500' }}
        >
          {task?.title ?? 'hello'}
        </p>
      </div>
      <div
        style={{
          float: 'right',
          position: 'relative',
          top: '6px',
          right: '24px',
        }}
        className="task-icons"
      >
        <img
          src={Trash}
          alt="Right Image"
          onClick={() => {
            deleteTask(task._id);
          }}
          style={{
            display: 'inline-block',
            position: 'relative',
            left: '21px',
            top: '0px',
            width: '24px',
            height: 'auto',
            marginRight: '1px',
          }}
        />
        <img
          src={Edit}
          alt="Right Image"
          onClick={() => {
            dispatch(open({ taskId: task._id, task: task }));
          }}
          style={{
            display: 'inline-block',
            position: 'relative',
            left: '21px',
            top: '0px',
            width: '24px',
            height: 'auto',
            marginLeft: '1px',
          }}
        />
      </div>
    </div>
  );
};

export default TaskBar;
