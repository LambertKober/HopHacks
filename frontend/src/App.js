import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import FullCalendarApp from './components/calendar';
import Landing from './components/landing';
import NavBar from './components/navbar';
import BootstrapModal from "./components/login_modal.js";



function App() {
    //const [load, upadateLoad] = useState(true);
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={() => <Landing />} />
                    <Route path="/calendar" exact component={() => <div>
                        <h1 style={{ marginTop: '2.5%' }}>Office Hour Schedule</h1>
                        <h5 style={{ marginBottom: '2%' }}>Drag to select multiple timeslots</h5>
                        <div className = "calendar_comp">
                            <FullCalendarApp className = "calendar_comp"></FullCalendarApp>
                        </div>
                    </div>} />
                </Switch>
            </Router>
        </div>
        // <div>
        //     <div ><NavBar></NavBar></div>
        //     <center><h1 style={{ marginTop: '2.5%' }}>Office Hour Schedule</h1></center>
        //     <center><h5 style={{ marginBottom: '2%' }}>Drag to select multiple timeslots</h5></center>
        //     <div className = "calendar_comp">
        //         <FullCalendarApp className = "calendar_comp"></FullCalendarApp>
        //     </div>
        // </div>
    )
}

export default App;
