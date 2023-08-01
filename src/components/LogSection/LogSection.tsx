import { FC } from 'react';
import { ActionType } from '../../enums/ActionType.ts';
import { dateTimeFormat } from '../../utils/helpers.ts';

interface LogLine {
    id: number,
    dateTime: Date,
    actionType: ActionType,
    value: number,
}

interface LogSectionProps {
    logLines: LogLine[],
}

const LogSection: FC<LogSectionProps> = ({ logLines }: LogSectionProps) => {
    return (
        <>
            <h3>System Log</h3>
            <div className={'log-section'}>
                <table>
                    <thead>
                    <tr>
                        <th>Date & Time</th>
                        <th>Action type</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {logLines.map((line: LogLine) => (
                        <tr key={line.id}>
                            <td>{dateTimeFormat(line.dateTime)}</td>
                            <td>{line.actionType}</td>
                            <td>{line.value}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default LogSection;