import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './slice/taskslice';
import EditTask from './slice/editslice';
import SearchTask from './slice/searchSlice';
import Analytics from './slice/analytics';

const store = configureStore({
  reducer: {
    taskList: taskReducer,
    editTask: EditTask,
    searchTask: SearchTask,
    analyticTask: Analytics,
  },
});

export default store;
