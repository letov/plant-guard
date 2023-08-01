import 'react-clock/dist/Clock.css';
import { FC } from 'react';
import Clock from 'react-clock';
import { dateFormat } from '../../utils/helpers.ts';

const ClockSection: FC = () => {
    return (
        <>
            <h3>System Date & Time</h3>
            <div className={'clock-section'}>
                <Clock
                    className={'clock-section__react-clock'}
                    value={new Date()}
                    renderNumbers={true}
                    size={200}
                />
                <div className={'clock-section__date'}>
                    <strong>{dateFormat(new Date())}</strong>
                </div>
            </div>
        </>
    );
};

export default ClockSection;
