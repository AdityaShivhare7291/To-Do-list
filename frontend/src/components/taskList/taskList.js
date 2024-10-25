import React, { useEffect, useState } from 'react';
import './taskList.css';
import TaskBar from '../taskBar/taskbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, setTasks } from '../../redux/slice/taskslice';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskList.tasks);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('authToken-todo');

      // Ensure the token exists before making the request
      if (token) {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_PORT}/tasks/getRecentTasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Add the token in the headers
            },
          }
        );
        console.log('Task created successfully:', response.data);
        dispatch(setTasks(response.data.tasks));
      } else {
        console.error('No token found in localStorage');
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteTasky = async (id) => {
    try {
      const token = localStorage.getItem('authToken-todo');
      const response = await axios.delete(
        `${process.env.REACT_APP_SERVER_PORT}/tasks/deleteTask/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the headers
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
        <p style={{ fontSize: '11px', fontWeight: '400', color: 'blue' }}>
          View All
        </p>
      </div>
      <div>
        {tasks?.slice(0, 4).map((item, index) => {
          return <TaskBar task={item} deleteTask={deleteTasky} />;
        })}
      </div>
    </div>
  );
}

export default TaskList;
