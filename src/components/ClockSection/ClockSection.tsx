import 'react-clock/dist/Clock.css';
import { FC, useEffect, useState } from 'react';
import Clock from 'react-clock';
import { dateFormat } from '../../utils/helpers.ts';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store.ts';

const ClockSection: FC = () => {
    const dateTime = useSelector((state: RootState) => state.settings.data?.dateTime);

    const [currentDateTime, setCurrentDateTime] = useState(dateTime ? new Date(dateTime) : new Date());

    useEffect(() => {
        setCurrentDateTime(dateTime ? new Date(dateTime) : new Date());
    }, [dateTime]);

    useEffect(() => {
        const interval = setInterval(() => setCurrentDateTime(new Date(currentDateTime.getTime() + 1000)), 1000);

        return () => {
            clearInterval(interval);
        };
    }, [currentDateTime]);

    return (
        <section className={'clock-section'}>
            <Clock
                className={'clock-section__react-clock'}
                value={currentDateTime}
                renderNumbers={true}
                size={200}
            />
            <div className={'clock-section__date'}>
                <strong>{dateFormat(currentDateTime)}</strong>
            </div>
        </section>
    );
};

export default ClockSection;
