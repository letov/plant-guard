import './App.css'
import 'react-tabs/style/react-tabs.css';
import "react-datetime/css/react-datetime.css";
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import ClockSection from './components/ClockBlock/ClockSection.tsx';
import LogSection from './components/LogSection/LogSection.tsx';
import { ActionType } from './enums/ActionType.ts';

function App() {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Dashboards</Tab>
                    <Tab>Settings</Tab>
                </TabList>
                <TabPanel>
                    <ClockSection/>
                    <LogSection
                        logLines={[{
                            id: 1,
                            dateTime: new Date('04 Dec 1995 00:12:00 GMT'),
                            actionType: ActionType.WATERING,
                            value: 123,
                        }]}
                    />
                </TabPanel>
                <TabPanel>
                    settings
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
