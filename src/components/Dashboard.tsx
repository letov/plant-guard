import { FC } from 'react';
import LogSection from './LogSection.tsx';
import ClockSection from './ClockSection.tsx';

const Dashboard: FC = () => {
    return (
        <>
            <ClockSection/>
            <LogSection/>
        </>
    );
};

export default Dashboard;
