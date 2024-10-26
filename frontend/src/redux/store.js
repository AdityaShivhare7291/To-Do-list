import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/taskslice';
import EditTask from './slice/editslice';
import SearchTask from './slice/searchSlice';

const store = configureStore({
  reducer: {
    taskList: taskReducer,
    editTask: EditTask,
    searchTask: SearchTask,
  },
});

export default store;
