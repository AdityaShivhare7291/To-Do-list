import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search } from '../../redux/slice/searchSlice';
import { deleteTask } from '../../redux/slice/taskslice';
import './searchTaskList.css';
import TaskBar from '../taskBar/taskbar';
import axios from 'axios';

const SearchTaskList = () => {
  const dispatch = useDispatch();
  const [filtery, Setfiltery] = useState('');

  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

  const tasks = useSelector((state) => state.taskList.tasks);
  const searchTerm = useSelector((state) => state.searchTask.task);

  useEffect(() => {
    console.log('searchTerm', { searchTerm, tasks });
    filterWords();
  }, [searchTerm]);

  function filterWords() {
    const filteredTasks =
      tasks.filter(
        (task) =>
          task?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
      ) ?? [];
    Setfiltery(filteredTasks);
  }

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

  const closeModal = () => {
    dispatch(search({ task: '' }));
  };

  if (searchTerm === '') return null;

  return (
    <div className="modal-content-below" onClick={(e) => e.stopPropagation()}>
      <h3>All Search Results for Week</h3>
      {filtery.length > 0 ? (
        filtery?.map((item) => {
          console.log('Search gone');
          if (
            currentMonth === new Date(item.date).getMonth() + 1 &&
            currentYear === new Date(item.date).getFullYear() &&
            startDateWeek <= new Date(item.date).getDate() &&
            lastDateWeek >= new Date(item.date).getDate() &&
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
          ) {
            let line = 'none';
            let checked = false;
            let bg = 'transparent';

            if (item.status === 'complete') {
              line = 'line-through';
              checked = true;
            } else if (item.status === 'closed') {
              bg = '#ff000045';
            }
            if (item.status === 'progress') {
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
          return null; // Return null if no conditions are met
        })
      ) : (
        <p>No tasks found.</p>
      )}
      <button className="close-btn" onClick={closeModal}>
        Close
      </button>
    </div>
  );
};

export default SearchTaskList;
