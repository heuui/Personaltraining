import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import { useState } from 'react';
import Customerlist from './Customerlist';
import Traininglist from './Traininglist';
import Calendar from './Calendar';


function TabApp() {

    const [value, setValue] = useState('customers');

    const handleChange = (event, value) => {
        setValue(value);
    };

    return(
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="customers" label="Customers" />
                <Tab value="trainings" label="Trainings" />
                <Tab value="calendar" label="Calendar" />
            </Tabs> 
            {value === 'customers' && <div>
                <Customerlist />
            </div>}
            {value === 'trainings' && <div>
                <Traininglist />
            </div>}
            {value === 'calendar' && <div>
                <Calendar />
            </div>}
        </div>
    )
}

export default TabApp;