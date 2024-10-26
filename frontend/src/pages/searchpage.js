import React from 'react';
import TaskBar from './taskbar';
import { useSelector } from 'react-redux';

const SearchTaskList = ({ searchTerm }) => {
  const tasks = useSelector((state) => state.taskList.tasks);

  // Filter tasks based on the search term
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskBar key={task._id} task={task} />
      ))}
    </div>
  );
};

export default SearchTaskList;
