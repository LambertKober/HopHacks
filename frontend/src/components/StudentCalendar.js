import ScheduleSelector from 'react-schedule-selector';
import React from 'react';
import { format , getMinutes} from 'date-fns'
import './calendar.css';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import axios from 'axios';


class StudentCalendarApp extends React.Component {

    state = {
        uuid: this.props.match.params.uuid,
        base_url: "",
        oh_times: [],
        schedule: []
    }

    constructor() {
        super();
        this.oh_times = new Map();
        let d1 = format(new Date(2021, 8, 20, 12, 0));
        let d2 = format(new Date(2021, 8, 20, 12, 15));
        let d3 = format(new Date(2021, 8, 20, 12, 30));
        let d4 = format(new Date(2021, 8, 20, 12, 45));
        this.oh_times[d1.toString()] = 1;
        this.oh_times[d2.toString()] = 1;
        this.oh_times[d3.toString()] = 1;
        this.oh_times[d4.toString()] = 1;
    }

    handleSubmit = () => {
        let mp = this.state.schedule;
        let res = [];
        for (let i = 0; i < mp.length; i++) {
            let d1 = mp[i];
            if (this.oh_times[format(d1).toString()] === 1) {
                res.push(format(d1).toString());
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
        if (this.oh_times[format(time).toString()] === 1) {
            return <div className={(selected) ? "box_close_hover" : "box_close"} ref={innerRef}></div>
            } else {
            return <div className={(selected) ? "box_open" : "box_open"} ref={innerRef}></div>
        }
    }
    renderLabel = (date) => {
        if (getMinutes(date) === 0 || getMinutes(date) === 30) {
            return <div>{format(date,"h:mma")}</div>;
        }
        return <div></div>
    }

    render() {
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
                        <button onClick={this.handleSubmit} type="button" className="btn btn-primary m-4" >Submit Availability</button>
                </div>
            </div>
        )
    }
}

export default withRouter(StudentCalendarApp);
