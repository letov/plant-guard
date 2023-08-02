import { TimeRange } from './TimeRange.ts';

export interface Settings {
    dateTime: number;
    silentTime: TimeRange;
    soilMoisture: number;
    checkFrequencyByDay: number;
    volumeWaterPerTimeML: number;
}