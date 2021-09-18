import logo from './logo.svg';
import './App.css';
import FullCalendarApp from "./components/calendar"
import {useState} from "react";


function App() {
    const [load, upadateLoad] = useState(true);
    return (

        <div className = "calendar_comp">
            <FullCalendarApp></FullCalendarApp>
        </div>
    )
}

export default App;
