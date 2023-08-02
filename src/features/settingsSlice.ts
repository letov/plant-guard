import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store.ts';
import axios from 'axios';
import { SettingsState } from '../interfaces/SettingsState.ts';
import { Settings } from '../interfaces/Settings.ts';

const initialState: SettingsState = {
    data: null,
    loading: false,
    error: null,
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getSettingsStart(state) {
            state.loading = true;
            state.error = null;
        },
        getSettingsSuccess(state, action: PayloadAction<Settings>) {
            state.loading = false;
            state.data = action.payload;
        },
        getSettingsFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getSettingsStart, getSettingsSuccess, getSettingsFailure } = settingsSlice.actions;

export default settingsSlice.reducer;

const url = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/settings`;

export const fetchSettings = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getSettingsStart());
        await new Promise((resolve) => setTimeout(resolve, import.meta.env.VITE_API_REQUEST_DELAY_MS));
        const response = await axios.get(url);
        dispatch(getSettingsSuccess(response.data));
    } catch (error) {
        dispatch(getSettingsFailure('Failed to fetch settings.'));
    }
};

export const saveSettings = (settings: Settings): AppThunk => async (dispatch) => {
    try {
        dispatch(getSettingsStart());
        await axios.post(url, settings);
        dispatch(getSettingsSuccess(settings));
    } catch (error) {
        dispatch(getSettingsFailure('Failed to save settings.'));
    }
};