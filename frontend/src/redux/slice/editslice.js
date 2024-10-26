import { createSlice } from '@reduxjs/toolkit';

const editTask = createSlice({
  name: 'editTask',
  initialState: {
    edittask: false,
    taskId: null,
    task: null,
  },
  reducers: {
    close: (state) => {
      state.edittask = false;
      state.taskId = null;
      state.task = null;
    },
    open: (state, action) => {
      const { taskId, task } = action.payload;
      state.task = task;
      state.edittask = true;
      state.taskId = taskId;
    },
  },
});

export const { close, open } = editTask.actions;

export default editTask.reducer;
