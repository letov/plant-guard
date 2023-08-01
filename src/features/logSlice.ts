import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store.ts';
import axios from 'axios';
import { LogState } from '../interfaces/LogState.ts';

const initialState: LogState = {
    data: null,
    loading: false,
    error: null,
};

const logSlice = createSlice({
    name: 'log',
    initialState,
    reducers: {
        getLogStart(state) {
            state.loading = true;
            state.error = null;
        },
        getLogSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.data = action.payload;
        },
        getLogFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getLogStart, getLogSuccess, getLogFailure } = logSlice.actions;

export default logSlice.reducer;

export const fetchLog = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getLogStart());
        const response = await axios.get('http://localhost:3000/api/log');
        dispatch(getLogSuccess(response.data));
    } catch (error) {
        dispatch(getLogFailure('Failed to fetch log.'));
    }
};