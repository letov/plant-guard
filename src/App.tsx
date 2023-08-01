import './App.css'
import 'react-tabs/style/react-tabs.css';
import "react-datetime/css/react-datetime.css";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import Dashboard from './components/Dashboard/Dashboard.tsx';

function App() {
    return (
        <>
            <Tabs className={'react-tabs'}>
                <TabList>
                    <Tab>Dashboards</Tab>
                    <Tab>Settings</Tab>
                </TabList>
                <TabPanel>
                    <Dashboard/>
                </TabPanel>
                <TabPanel>
                    settings
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
