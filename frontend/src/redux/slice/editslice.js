import { createSlice } from '@reduxjs/toolkit';

const editTask = createSlice({
    name: 'editTask',
    initialState: {
        edittask: false,
        taskId: null,
    },
    reducers: {
        close: (state) => {
            state.edittask = false;
            state.taskId = null;
        },
        open: (state, action) => {
            const { taskId } = action.payload;
            state.edittask = true;
            state.taskId = taskId;
        },
    },
});

export const { close, open } = editTask.actions;

export default editTask.reducer;
