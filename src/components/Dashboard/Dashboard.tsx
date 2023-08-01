import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import store, { RootState } from '../../store/store.ts';
import ReactLoading from 'react-loading';
import LogSection from '../LogSection/LogSection.tsx';
import ClockSection from '../ClockBlock/ClockSection.tsx';
import { fetchSettings } from '../../features/settingsSlice.ts';
import { fetchLog } from '../../features/logSlice.ts';

const Dashboard: FC = () => {
    useEffect(() => {
        store.dispatch(fetchSettings());
        store.dispatch(fetchLog());
    }, []);
    const loading = useSelector((state: RootState) => state.settings.loading);

    const [fastLoading, setFastLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setFastLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, []);

    if (fastLoading) {
        return <></>
    }

    if (loading) {
        return <ReactLoading className={'loading-section'} type={'cubes'} color={'#000'} width={200}/>
    }

    return (
        <>
            <ClockSection/>
            <LogSection/>
        </>
    );
};

export default Dashboard;
