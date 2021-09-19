import ScheduleSelector from 'react-schedule-selector';
import React from 'react';
import { add, parseISO, format, formatISO , getMinutes} from 'date-fns'
import './calendar.css';
import { useParams } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import axios from 'axios';


class CACalendarApp extends React.Component {

    state = {
        uuid: "",
        name: "",
        base_url: "http://localhost:8000/",
        oh_times: new Map(),
        schedule: []
    }

    constructor() {
        super();
    }

    handleSubmit = () => {
        let mp = this.state.schedule;
        let results = [];
        for (let i = 0; i < mp.length; i++) {
            let d1 = mp[i];
            results.push(formatISO(d1).toString());
        }
        let selection = {};
        selection.timeSlots = results;
        selection.name = this.state.name;
        console.log(selection.name)
        axios.put(this.state.base_url + `cas/${this.state.uuid}`, { selection })
            .then()
    }


    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    updateHours = (sessions) => {
        //console.log("updating hours")
        let sessionSlots = [];

        for(let i = 1; i < sessions.length; ++i) {
            let session = sessions[i];
            sessionSlots = sessionSlots.concat(this.splitTimeBlock(session.startTime, session.endTime));
        }
        //console.log("foo")
        for(let i = 1; i < sessionSlots.length; ++i) {
            this.state.oh_times[formatISO(sessionSlots[i])] = 1;
            //console.log(formatISO(sessionSlots[i]))
        }
    }

    splitTimeBlock = (start, end) => {
        let out = [];
        let startTime = parseISO(start);
        let endTime = parseISO(end)
        let t_d = (endTime - startTime) / 60000; // convert minutes delta
        let intervals = t_d / this.timeInterval;
        //console.log(intervals)
        for (let i = 0; i < intervals; ++i) {
            out.push(add(startTime, {minutes: i*this.timeInterval}));
            //console.log(out);
        }
        return out;
    }

    renderCell = (time, selected, innerRef) => {
        if (this.state.oh_times[formatISO(time).toString()] === 1) {
            return <div className={(selected) ? "box_close_hover" : "box_close"} ref={innerRef}></div>
        } else {
            return <div className={(selected) ? "box_open_hover" : "box_open"} ref={innerRef}></div>
        }
    }
    renderLabel = (date) => {
        if (getMinutes(date) === 0 || getMinutes(date) === 30) {
            return <div>{format(date,"hh:mma")}</div>;
        }
        return <div></div>
    }

    handleSetState = (state, props) => {
        let list = []
        state.uuid = props.match.params.uuid;
        state.name = props.match.params.name;
        axios.get(this.state.base_url + `cas/${this.state.uuid}`)
            .then(res => this.updateHours(res.data.timeSlots))
        //console.log(this.state.oh_times)
        //console.log(state.uuid)
        //console.log(state.name)
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

export default withRouter(CACalendarApp);