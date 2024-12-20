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
    console.log({ tasks });
    if (
      currentMonth === new Date(task.date).getMonth() + 1 &&
      currentYear === new Date(task.date).getFullYear() &&
      startDateWeek <= new Date(task.date).getDate() &&
      lastDateWeek >= new Date(task.date).getDate()
    )
      task.title.toLowerCase().includes(searchTerm.toLowerCase());
    else return false;
  });

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskBar key={task._id} task={task} />
      ))}
    </div>
  );
};

export default SearchTaskList;
