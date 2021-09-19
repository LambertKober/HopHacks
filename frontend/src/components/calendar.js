import ScheduleSelector from 'react-schedule-selector'; //from https://www.npmjs.com/package/react-schedule-selector
import React from 'react';
import {format, formatISO , getMinutes} from 'date-fns';
import './calendar.css';



class FullCalendarApp extends React.Component {
    state = {
        schedule: []
    }

    constructor() {
        super();
        this.oh_times = new Map();
        let d1 = formatISO(new Date(2021, 8, 20, 12, 0));
        let d2 = formatISO(new Date(2021, 8, 20, 12, 15));
        let d3 = formatISO(new Date(2021, 8, 20, 12, 30));
        let d4 = formatISO(new Date(2021, 8, 20, 12, 45));
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
            if (this.oh_times[formatISO(d1).toString()] === 1) {
                res.push(formatISO(d1).toString());
            }
        }
        console.log(res);
    }


    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    renderCell = (time, selected, innerRef) => {
        if (this.oh_times[formatISO(time).toString()] === 1) {
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
                    timeFormat={"DD:HH:mm"}
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

export default FullCalendarApp;
