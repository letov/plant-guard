import './App.css'
import 'react-tabs/style/react-tabs.css';
import "react-datetime/css/react-datetime.css";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Dashboard from './components/Dashboard.tsx';
import { useEffect } from 'react';
import store, { RootState } from './store/store.ts';
import { fetchSettings } from './features/settingsSlice.ts';
import { fetchLog } from './features/logSlice.ts';
import Settings from './components/Settings.tsx';
import { useSelector } from 'react-redux';
import ReactLoading from 'react-loading';

function App() {
    const loading = useSelector((state: RootState) => state.settings.loading);

    const tabChanged = () => {
        store.dispatch(fetchSettings());
        store.dispatch(fetchLog());
    };

    useEffect(tabChanged, []);

    const spinner = <ReactLoading className={'loading-section'} type={'cylon'} color={'#000'} width={300}/>;

    return (
        <>
            <Tabs className={'react-tabs'} onSelect={tabChanged}>
                <TabList>
                    <Tab disabled={loading}>Dashboards</Tab>
                    <Tab disabled={loading}>Settings</Tab>
                </TabList>
                <TabPanel>
                    {loading ? spinner : <Dashboard/>}
                </TabPanel>
                <TabPanel>
                    {loading ? spinner : <Settings/>}
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
