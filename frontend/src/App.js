import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import FullCalendarApp from './components/calendar';
import Landing from './components/landing';
import NavBar from './components/navbar';
import BootstrapModal from "./components/login.js";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={() => <Landing />} />
                    <Route path="/calendar" exact component={() => <FullCalendarApp />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;