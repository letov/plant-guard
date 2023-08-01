import { Settings } from './Settings.ts';

export interface SettingsState {
    data: Settings | null;
    loading: boolean;
    error: string | null;
}
