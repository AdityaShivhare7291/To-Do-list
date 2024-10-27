import React from 'react';
import TaskBar from './taskbar';
import { useSelector } from 'react-redux';

const SearchTaskList = ({ searchTerm }) => {
  const tasks = useSelector((state) => state.taskList.tasks);

  const startDateWeek = useSelector(
    (state) => state.analyticTask.weekFirstDate
  );
  const lastDateWeek = useSelector((state) => state.analyticTask.weekLastDate);
  const currentMonth = useSelector((state) => state.analyticTask.currentMonth);
  const currentYear = useSelector((state) => state.analyticTask.currentYear);

  const filteredTasks = tasks.filter((task) => {
    if (currentMonth === new Date(element.date).getMonth() + 1 &&
      currentYear === new Date(element.date).getFullYear() &&
      startDateWeek <= new Date(element.date).getDate() &&
      lastDateWeek >= new Date(element.date).getDate())
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    else
      return false;
  }
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
