import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {
        getLoading: (state, action) => {
            state.loading = action.payload;
        },
        colorReset: () => initialState,
    },
});

export default colorSlice.reducer;

export const {
    getLoading,
    colorReset
} = colorSlice.actions;

export const colorSelector = (state) => state.color;
