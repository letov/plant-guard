import "react-datetime/css/react-datetime.css";
import 'react-time-picker/dist/TimePicker.css';
import { FC, useState } from 'react';
import Datetime from 'react-datetime';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';
import TimePicker from 'react-time-picker';

const Settings: FC = () => {
    const settings = useSelector((state: RootState) => state.settings.data);

    const [silentTimeStart, setSilentTimeStart] = useState<string | null>(`
        ${settings?.silentTime.startHour ?? 0}:${settings?.silentTime.startMinute ?? 0}
    `);

    const [silentTimeEnd, setSilentTimeEnd] = useState<string | null>(`
        ${settings?.silentTime.endHour ?? 0}:${settings?.silentTime.endMinute ?? 0}
    `);

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
                            initialValue={settings ? new Date(settings.dateTime) : new Date()}
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
                                onChange={value => setSilentTimeStart(value?.toString() ?? null)}
                            />
                            -
                            <TimePicker
                                className={'silent-time__picker'}
                                value={silentTimeEnd}
                                format={'HH:mm'}
                                disableClock={true}
                                clearIcon={null}
                                onChange={value => setSilentTimeEnd(value?.toString() ?? null)}
                            />
                        </div>
                    </td>
                </tr>
                </tbody>
            </table>
        </section>
    );
}

export default Settings;