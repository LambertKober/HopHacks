import ScheduleSelector from 'react-schedule-selector';
import React from 'react';
import { format, formatISO , getMinutes} from 'date-fns'
import './calendar.css';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import axios from 'axios';


class StudentCalendarApp extends React.Component {

    state = {
        uuid: "",
        base_url: "",
        oh_times: new Map(),
        schedule: []
    }

    constructor() {
        super();
        let d1 = formatISO(new Date(2021, 8, 20, 12, 0));
        let d2 = formatISO(new Date(2021, 8, 20, 12, 15));
        let d3 = formatISO(new Date(2021, 8, 20, 12, 30));
        let d4 = formatISO(new Date(2021, 8, 20, 12, 45));
        this.state.oh_times[d1.toString()] = 1;
        this.state.oh_times[d2.toString()] = 1;
        this.state.oh_times[d3.toString()] = 1;
        this.state.oh_times[d4.toString()] = 1;
    }

    handleSubmit = () => {
        console.log(this.state)
        let mp = this.state.schedule;
        let res = [];
        for (let i = 0; i < mp.length; i++) {
            let d1 = mp[i];
            if (this.state.oh_times[formatISO(d1).toString()] === 1) {
                res.push(formatISO(d1).toString());
            }
        }
        let selection = {};
        selection.UUID = this.state.uuid;
        selection.timeSlots = res;
        axios.post("/student", { selection })
            .then(res => {})
    }


    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    renderCell = (time, selected, innerRef) => {
        if (this.state.oh_times[formatISO(time).toString()] === 1) {
            return <div className={(selected) ? "box_close_hover" : "box_close"} ref={innerRef}></div>
        } else {
            return <div className={(selected) ? "box_open" : "box_open"} ref={innerRef}></div>
        }
    }
    renderLabel = (date) => {
        if (getMinutes(date) === 0 || getMinutes(date) === 30) {
            return <div>{format(date,"hh:mma")}</div>;
        }
        return <div></div>
    }

    handleSetState = (state, props) => {
        state.uuid = props.match.params.uuid;
    }

    render() {
        this.setState(this.handleSetState);
        return (
            <div>
                <ScheduleSelector
                    selection={this.state.schedule}
                    numDays={7}
                    minTime={10}
                    maxTime={20}
                    hourlyChunks={4}
                    onChange={this.handleChange}
                    timeFormat={"HH:mma"}
                    dateFormat="ddd M/D"
                    selectionScheme="linear"
                    renderDateCell={this.renderCell}
                    renderTimeLabel={this.renderLabel}
                />
                <div className="col text-center">
                        <button onClick={this.handleSubmit.bind(this)} type="button" className="btn btn-primary m-4" >Submit Availability</button>
                </div>
            </div>
        )
    }
}

export default withRouter(StudentCalendarApp);
