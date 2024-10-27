import React, { useEffect, useState } from 'react';
import './taskList.css';
import TaskBar from '../../components/taskBar/taskbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, setTasks } from '../../redux/slice/taskslice';
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.taskList.tasks);
  const [filteredTasks, setFilteredTasks] = useState([]);

  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

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

  const updateData = async (editTaskData) => {
    try {
      // Send the data to the server
      console.log({ server: process.env.REACT_APP_SERVER_PORT });
      const token = localStorage.getItem('authToken-todo');
      const id = editTaskData._id;

      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_PORT}/tasks/updateTask/${id}`,
        editTaskData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token in the headers
          },
        }
      );
      console.log('Task updated successfully:', response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("tasks at tasklist.js", tasks)
  }, [tasks])

  useEffect(() => {
    for (let i = 0; i < tasks?.length; i++) {
      if (
        tasks.status === 'open' &&
        new Date().getDate() >= new Date(tasks.date).getDate() &&
        new Date().getMonth() >= new Date(tasks.endTime).getHours() &&
        new Date().getHours() >= new Date(tasks.endTime).getHours()
      ) {
        tasks[i].status = 'closed';
        updateData(tasks);
      }
    }
    dispatch(setTasks(tasks));
  }, [tasks]);

  useEffect(() => {
    const filtered = tasks.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        currentMonth === itemDate.getMonth() + 1 &&
        currentYear === itemDate.getFullYear() &&
        startDateWeek <= itemDate.getDate() &&
        lastDateWeek >= itemDate.getDate()
      );
    });
    setFilteredTasks(filtered);
  }, [tasks, currentMonth, currentYear, startDateWeek, lastDateWeek]);

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
      <div className="task-container-12">
        <p style={{ fontSize: '18px', fontWeight: '600' }}>Tasks Today</p>
        <p
          style={{ fontSize: '11px', fontWeight: '400', color: 'blue' }}
          onClick={() => {
            navigate('/viewAllTasks');
          }}
        >
          View All
        </p>
      </div>
      <div>
        {filteredTasks
          .map((item, index) => {
            console.log(item)
            if (currentMonth === new Date(item.date).getMonth() + 1 &&
              currentYear === new Date(item.date).getFullYear() &&
              startDateWeek <= new Date(item.date).getDate() &&
              lastDateWeek >= new Date(item.date).getDate()) {
              console.log("flitery items", item);
              if (item.status === 'complete') {
                return (
                  <TaskBar
                    task={item}
                    deleteTask={deleteTasky}
                    styled={{
                      line: 'line-through',
                      checked: true,
                      bg: 'transparent',
                    }}
                  />
                );
              }
              if (item.status === 'progress') {
                return (
                  <TaskBar
                    task={item}
                    deleteTask={deleteTasky}
                    styled={{ line: 'none', checked: false, bg: '#0000ff47' }}
                  />
                );
              }
              if (item.status === 'open') {
                return (
                  <TaskBar
                    task={item}
                    deleteTask={deleteTasky}
                    styled={{ line: 'none', checked: false, bg: 'transparent' }}
                  />
                );
              }
            }
          })
          .slice(0, 4)}
      </div>
    </div>
  );
}

export default TaskList;
