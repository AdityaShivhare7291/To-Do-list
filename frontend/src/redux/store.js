import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/taskslice';
import EditTask from './slice/editslice';

const store = configureStore({
  reducer: {
    taskList: taskReducer,
    editTask: EditTask,
  },
});

export default store;
