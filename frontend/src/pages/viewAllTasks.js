import React from 'react';
import '../components/taskList/taskList.css';
import './viewAllTasks.css';
import TaskBar from '../components/taskBar/taskbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../redux/slice/taskslice';
import { useNavigate } from 'react-router-dom';
import { close } from '../redux/slice/editslice';
import EditTask from '../components/edittask/edittask';

function ViewAllTasks({ taskId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.taskList.tasks);
  const isEditTaskOpen = useSelector((state) => state.editTask.edittask);

  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

  const deleteTasky = async (id) => {
    try {
      const token = localStorage.getItem('authToken-todo');
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_PORT}/tasks/deleteTask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Task Deleted successfully:', response.data);
      dispatch(deleteTask(id));
    } catch (e) {
      console.log('Caught error while deleting task');
    }
  };

  return (
    <div>
      <div className="task-container-1">
        <p style={{ fontSize: '18px', fontWeight: '600' }}>Tasks Today</p>
        <p
          style={{ fontSize: '11px', fontWeight: '400', color: 'blue' }}
          onClick={() => {
            navigate('/dashboard');
          }}
        >
          Go Back
        </p>
      </div>
      <div className="task-scroll-container">
        {tasks.map((item) => {
          if (
            currentMonth === new Date(item.date).getMonth() + 1 &&
            currentYear === new Date(item.date).getFullYear() &&
            startDateWeek <= new Date(item.date).getDate() &&
            lastDateWeek >= new Date(item.date).getDate()
          ) {
            console.log('items are', {
              date: new Date(item.date).getDate(),
              currentMonth: new Date(item.date).getMonth(),
            });
            if (true) {
              let line = 'none';
              let checked = false;
              let bg = 'transparent';

              if (item.status === 'complete') {
                line = 'line-through';
                checked = true;
              } else if (item.status === 'closed') {
                bg = '#ff000045';
              } else if (item.status === 'progress') {
                line = 'none';
                checked = true;
                bg = '#0000ff47';
              }

              return (
                <TaskBar
                  key={item._id} // Add a key prop to uniquely identify each task
                  task={item}
                  deleteTask={deleteTasky}
                  styled={{ line, checked, bg }}
                />
              );
            }
          }
          return null; // Return null if no conditions are met
        })}
      </div>
      <EditTask isOpen={isEditTaskOpen} onClose={() => dispatch(close())} />
    </div>
  );
}

export default ViewAllTasks;
