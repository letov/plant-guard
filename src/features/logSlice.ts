import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store.ts';
import axios from 'axios';
import { LogState } from '../interfaces/LogState.ts';
import { LogLine } from '../interfaces/LogLine.ts';

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
        getLogSuccess(state, action: PayloadAction<LogLine[]>) {
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

const url = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/log`;

export const fetchLog = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getLogStart());
        const response = await axios.get(url);
        dispatch(getLogSuccess(response.data));
    } catch (error) {
        dispatch(getLogFailure('Failed to fetch log.'));
    }
};