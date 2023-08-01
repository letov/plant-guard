import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/store.ts';
import axios from 'axios';
import { SettingsState } from '../interfaces/SettingsState.ts';

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
        getSettingsSuccess(state, action: PayloadAction<any>) {
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

export const fetchSettings = (): AppThunk => async (dispatch) => {
    try {
        dispatch(getSettingsStart());
        const response = await axios.get('http://localhost:3000/api/settings');
        dispatch(getSettingsSuccess(response.data));
    } catch (error) {
        dispatch(getSettingsFailure('Failed to fetch settings.'));
    }
};

export const saveSettings = (settings: any): AppThunk => async (dispatch) => {
    try {
        dispatch(getSettingsStart());
        await axios.post('http://localhost:3000/api/settings', settings);
        dispatch(getSettingsSuccess(settings));
    } catch (error) {
        dispatch(getSettingsFailure('Failed to save settings.'));
    }
};