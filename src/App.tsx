import './App.css'
import 'react-tabs/style/react-tabs.css';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

function App() {
    return (
        <>
            <Tabs>
                <TabList>
                    <Tab>Dashboard</Tab>
                    <Tab>Settings</Tab>
                </TabList>

                <TabPanel>
                    <h2>Any content 1</h2>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </>
    )
}

export default App
