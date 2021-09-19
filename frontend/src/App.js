import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import StudentCalendarApp from './components/StudentCalendar';
import CACalendarApp from './components/CACalendar';
import Landing from './components/landing';
import NavBar from './components/navbar';
import BootstrapModalStudent from "./components/login_modal_student.js";



function App() {
    //const [load, upadateLoad] = useState(true);
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={() => <Landing />} />
                    <Route path="/calendar/student/:uuid" children={() => <div>
                        <h1 style={{ marginTop: '2.5%' }}>Office Hour Schedule</h1>
                        <h5 style={{ marginBottom: '2%' }}>Drag to select multiple timeslots</h5>
                        <div className = "calendar_comp">
                            <StudentCalendarApp className = "calendar_comp"></StudentCalendarApp>
                        </div>
                    </div>} />
                    <Route path="/calendar/CA/:uuid" children={() => <div>
                        <h1 style={{ marginTop: '2.5%' }}>Office Hour Schedule</h1>
                        <h5 style={{ marginBottom: '2%' }}>Drag to select multiple timeslots</h5>
                        <div className = "calendar_comp">
                            <CACalendarApp className = "calendar_comp"></CACalendarApp>
                        </div>
                    </div>} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;