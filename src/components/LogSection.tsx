import { FC } from 'react';
import { dateFormat, timeFormat } from '../utils/helpers.ts';
import { LogLine } from '../interfaces/LogLine.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { actionTypeTitles } from '../enums/ActionType.ts';

const LogSection: FC = () => {
    const log = useSelector((state: RootState) => state.log.data);

    if (!log) {
        return <></>;
    }

    return (
        <section className={'log-section'}>
            <table className={'monochrome-table'}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Action type</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {log.map((line: LogLine) => (
                    <tr key={`${line.createdAt}_${line.actionType}_${line.value}_${Math.random()}`}>
                        <td>{dateFormat(new Date(line.createdAt))}</td>
                        <td>{timeFormat(new Date(line.createdAt))}</td>
                        <td>{actionTypeTitles[line.actionType] ?? ''}</td>
                        <td>{line.value}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}

export default LogSection;