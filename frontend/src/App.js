import logo from './logo.svg';
import './App.css';
import FullCalendarApp from "./components/calendar"
import NavBar from "./components/navbar";
import {useState} from "react";


function App() {
    //const [load, upadateLoad] = useState(true);
    return (
        <div>
            <div ><NavBar></NavBar></div>
            <center><h1 style={{ marginTop: '2.5%' }}>Office Hour Schedule</h1></center>
            <center><h5 style={{ marginBottom: '2%' }}>Drag to select multiple timeslots</h5></center>
            <div className = "calendar_comp">
                <FullCalendarApp className = "calendar_comp"></FullCalendarApp>
            </div>
        </div>
    )
}

export default App;
