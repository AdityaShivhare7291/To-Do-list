import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/taskslice';

const store = configureStore({
  reducer: {
    taskList: taskReducer, // Add task slice to the store
  },
});

export default store;
