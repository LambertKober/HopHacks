import logo from './logo.svg';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import FullCalendarApp from './components/calendar';
import LandingApp from './components/landing';

function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path="/" exact component={() => <LandingApp />} />
                    <Route path="/calendar" exact component={() => <FullCalendarApp />} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;