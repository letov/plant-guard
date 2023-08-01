import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import settingsReducer from '../features/settingsSlice.ts';
import logReducer from '../features/logSlice.ts';

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        log: logReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

export default store;