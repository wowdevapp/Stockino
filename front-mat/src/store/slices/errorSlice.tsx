import { createSlice } from '@reduxjs/toolkit';

const errorSlice = createSlice({
    name: 'errors',
    initialState: {},
    reducers: {
        setError: (state, action) => action.payload,
        clearError: () => {},
    },
});

export const { setError, clearError } = errorSlice.actions;

export default errorSlice.reducer;