import ScheduleSelector from 'react-schedule-selector'; //from https://www.npmjs.com/package/react-schedule-selector
import React from 'react';
import {format, formatISO , getMinutes} from 'date-fns';
import './student_calendar.css';
import studentModalInfo from "./student_modal_info.js";


class studentCalendarApp extends React.Component {
    state = {
        // modalShow: false,
        schedule: []
    }

    constructor() {
        super();
        this.oh_times = new Map();
        for (let i = 0; i < 60; i+=15) {
            let d1 = formatISO(new Date(2021, 8, 24, 15, i));
            let d2 = formatISO(new Date(2021, 8, 22, 12, i));
            let d3 = formatISO(new Date(2021, 8, 20, 12, i));
            let d4 = formatISO(new Date(2021, 8, 20, 18, i));
            let d5 = formatISO(new Date(2021, 8, 21, 14, i));
            let d6 = formatISO(new Date(2021, 8, 22, 14, 45+i));
            let d7 = formatISO(new Date(2021, 8, 21, 17, i));
            let d8 = formatISO(new Date(2021, 8, 21, 17, 45+i));
            this.oh_times[d1.toString()] = 1;
            this.oh_times[d2.toString()] = 1;
            this.oh_times[d3.toString()] = 1;
            this.oh_times[d4.toString()] = 1;
            this.oh_times[d5.toString()] = 1;
            this.oh_times[d6.toString()] = 1;
            this.oh_times[d7.toString()] = 1;
            this.oh_times[d8.toString()] = 1;
        }

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
            return <div className={(selected) ? "box_open_hover" : "box_open"} ref={innerRef}></div>
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
                        <studentModalInfo/>
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}

export default studentCalendarApp;
