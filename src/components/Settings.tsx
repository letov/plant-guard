import "react-datetime/css/react-datetime.css";
import 'react-time-picker/dist/TimePicker.css';
import { FC, useState } from 'react';
import Datetime from 'react-datetime';
import { useSelector } from 'react-redux';
import store, { RootState } from '../store/store.ts';
import TimePicker from 'react-time-picker';
import { leadingZero } from '../utils/helpers.ts';
import Range from './Range.tsx';
import { saveSettings } from '../features/settingsSlice.ts';

const Settings: FC = () => {
    const settings = useSelector((state: RootState) => state.settings.data);

    const defaultTimeInterval = (hours: number | undefined, minutes: number | undefined) =>
        `${leadingZero(hours)}:${leadingZero(minutes)}:00`

    const [dateTime, setDateTime] =
        useState<Date>(settings ? new Date(settings.dateTime) : new Date());
    const [silentTimeStart, setSilentTimeStart] =
        useState<string>(defaultTimeInterval(settings?.silentTime.startHour, settings?.silentTime.startMinute));
    const [silentTimeEnd, setSilentTimeEnd] =
        useState<string>(defaultTimeInterval(settings?.silentTime.endHour, settings?.silentTime.endMinute));

    const defaultValue = (value: number | undefined) => Math.max(value ?? 1, 1);

    const [soilMoisture, setSoilMoisture] =
        useState([defaultValue(settings?.soilMoisture)]);
    const [checkFrequencyByDay, setCheckFrequencyByDay] =
        useState([defaultValue(settings?.checkFrequencyByDay)]);
    const [volumeWaterPerTimeML, setVolumeWaterPerTimeML] =
        useState([defaultValue(settings?.volumeWaterPerTimeML)]);

    const updateSettings = () => {
        store.dispatch(
            saveSettings(
                {
                    dateTime: dateTime.getTime(),
                    silentTime: {
                        startHour: +silentTimeStart.split(':')[0],
                        startMinute: +silentTimeStart.split(':')[1],
                        endHour: +silentTimeEnd.split(':')[0],
                        endMinute: +silentTimeEnd.split(':')[1],
                    },
                    soilMoisture: soilMoisture[0],
                    checkFrequencyByDay: checkFrequencyByDay[0],
                    volumeWaterPerTimeML: volumeWaterPerTimeML[0],
                }
            )
        );
    }

    return (
        <section className={'settings-section'}>
            <table className={'monochrome-table'}>
                <thead>
                <tr>
                    <th>Setting</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>Date/Time:</td>
                    <td>
                        <Datetime
                            className={'datetime-picker'}
                            dateFormat={'DD.MM.YY'}
                            timeFormat={'HH:mm'}
                            initialValue={dateTime}
                            onChange={(value) => setDateTime(new Date(value.toString()))}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Silent time:</td>
                    <td>
                        <div className={'silent-time'}>
                            <TimePicker
                                className={'silent-time__picker'}
                                value={silentTimeStart}
                                format={'HH:mm'}
                                disableClock={true}
                                clearIcon={null}
                                onChange={value => setSilentTimeStart(value?.toString() ?? '00:00:00')}
                            />
                            -
                            <TimePicker
                                className={'silent-time__picker'}
                                value={silentTimeEnd}
                                format={'HH:mm'}
                                disableClock={true}
                                clearIcon={null}
                                onChange={value => setSilentTimeEnd(value?.toString() ?? '00:00:00')}
                            />
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>Min soil moisture level (%):</td>
                    <td>
                        <Range
                            value={soilMoisture}
                            min={1}
                            max={100}
                            setValue={setSoilMoisture}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Number of checks per day:</td>
                    <td>
                        <Range
                            value={checkFrequencyByDay}
                            min={1}
                            max={48}
                            setValue={setCheckFrequencyByDay}
                        />
                    </td>
                </tr>
                <tr>
                    <td>Water volume per irrigation (ml):</td>
                    <td>
                        <Range
                            value={volumeWaterPerTimeML}
                            min={1}
                            max={50}
                            setValue={setVolumeWaterPerTimeML}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className={'settings-section__button'}>
                <button
                    className={'monochrome-button'}
                    onClick={updateSettings}
                >Save</button>
            </div>
        </section>
    );
}

export default Settings;