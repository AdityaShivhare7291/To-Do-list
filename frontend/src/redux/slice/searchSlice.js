import { faL } from '@fortawesome/free-solid-svg-icons';
import { createSlice } from '@reduxjs/toolkit';

const searchTask = createSlice({
  name: 'searchTask',
  initialState: {
    task: '',
    isopen: false,
    result: [],
  },
  reducers: {
    close: (state) => {
      state.task = '';
      state.isopen = false;
    },
    search: (state, action) => {
      const { task } = action.payload;
      state.task = task;
      state.isopen = true;
    },
    update: (state, action) => {
      const { result } = action.payload;
      state.result = result;
    },
  },
});

export const { close, search, update } = searchTask.actions;
export default searchTask.reducer;
