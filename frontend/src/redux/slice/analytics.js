import { createSlice } from '@reduxjs/toolkit';

const analyticTask = createSlice({
  name: 'analyticTask',
  initialState: {
    completed: 0,
    progress: 0,
    open: 0,
    closed: 0,
    weekFirstDate: null,
    weekLastDate: null,
    currentMonth: null,
    currentYear: null,
    progresspercent: 0,
  },
  reducers: {
    updateAnalytics: (state, action) => {
      // state.completed = action.payload.completed;
      state.progresspercent = action.payload.progress;
      // state.open = action.payload.open;
      // state.closed = action.payload.closed;
    },
    updateAnalyticsCriteria: (state, action) => {
      console.log("hhhh", { currentYear: action.payload.currentYear })
      state.weekFirstDate = action.payload.weekFirstDate;
      state.weekLastDate = action.payload.weekLastDate;
      state.currentMonth = action.payload.currentMonth;
      state.currentYear = action.payload.currentYear;
    },
  },
});

export const { updateAnalytics, updateAnalyticsCriteria } =
  analyticTask.actions;

export default analyticTask.reducer;
