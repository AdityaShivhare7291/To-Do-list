// src/store/taskSlice.js

import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'taskList',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      const newState = [];
      newState.push(action.payload);
      state.tasks = [...newState, ...state.tasks]; // Add new task
    },
    updateTask: (state, action) => {
      const { taskId, updatedTask } = action.payload;
      const existingTask = state.tasks.find((task) => task._id === taskId);
      if (existingTask) {
        Object.assign(existingTask, updatedTask); // Update task properties
      }
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      state.tasks = state.tasks.filter((task) => task.id !== taskId); // Remove task
    },
    setTasks: (state, action) => {
      state.tasks = action.payload; // Set initial tasks from the database
    },
  },
});

// Export actions
export const { addTask, updateTask, deleteTask, setTasks } = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;
