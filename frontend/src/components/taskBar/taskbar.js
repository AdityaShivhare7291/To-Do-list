import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Trash from '../../static/trash-2.png';
import Edit from '../../static/edit.png';
import './taskbar.css';
import { useSelector, useDispatch } from 'react-redux';
import { open } from '../../redux/slice/editslice';
import { useNavigate } from 'react-router-dom';

const TaskBar = ({ task, deleteTask, styled }) => {
  const navigate = useNavigate();
  console.log({ styled });
  const dispatch = useDispatch();

  if (!styled.bg) return;

  return (
    <div style={{ backgroundColor: styled.bg }}>
      <div className="task-checkbox">
        <Checkbox
          checked={styled.checked}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
      <div style={{ display: 'inline-block' }} className="task-title">
        <p
          style={{
            fontFamily: 'poppins',
            fontSize: '14px',
            fontWeight: '500',
            textDecoration: styled.line,
          }}
          onClick={() => {
            navigate('/viewTask', { state: { task } });
          }}
        >
          {task?.title ?? 'hello'}
        </p>
      </div>
      <div
        style={{
          float: 'right',
          position: 'relative',
          top: '9px',
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
