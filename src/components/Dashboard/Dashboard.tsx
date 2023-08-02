import { FC } from 'react';
import LogSection from '../LogSection/LogSection.tsx';
import ClockSection from '../ClockSection/ClockSection.tsx';

const Dashboard: FC = () => {
    return (
        <>
            <ClockSection/>
            <LogSection/>
        </>
    );
};

export default Dashboard;
