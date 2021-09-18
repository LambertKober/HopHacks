import ScheduleSelector from 'react-schedule-selector';
import React from 'react';



class FullCalendarApp extends React.Component {
    state = { schedule: [] }

    handleChange = newSchedule => {
        this.setState({ schedule: newSchedule })
    }

    render() {
        return (
            <ScheduleSelector
                selection={this.state.schedule}
                numDays={5}
                minTime={8}
                maxTime={22}
                hourlyChunks={4}
                onChange={this.handleChange}
            />
        )
    }
}

export default FullCalendarApp;
