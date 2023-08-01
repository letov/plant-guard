import { TimeRange } from './TimeRange.ts';

export interface Settings {
    dateTime: number;
    silentTime: TimeRange;
    waterLevel: number;
    checkFrequencyByDay: number;
    volumeWaterPerTimeML: number;
}