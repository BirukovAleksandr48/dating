import React, { Component } from 'react';
import './Calendar.sass';
import moment from 'moment'

class Calendar extends Component {

    constructor (props) {
        super(props)
        this.state = {
            isHiden: true,
            shift: 0,
            daysAbbreviation: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
            selectedDay: moment()
        }
    }

    onCalendarTitleClicked () {
        this.setState({isHiden: !this.state.isHiden})
    }

    onWeekChange (num) {
        this.setState({ shift: this.state.shift + num })
    }

    onThisDayClicked() {
        this.setState({ shift: 0, isHiden: true, selectedDay: moment() })
    }

    selectItem(i) {
        const selectedDay = moment().day(this.state.shift + i)
        this.setState({selectedDay})
    }

    generateDays () {
        const items = [];
        for(let i = 0; i < 7; i++) {
            let className = 'Calendar-days-item ';
            const day = moment().day(this.state.shift + i)

            if(day.format('DD-MM-YYYY') === this.state.selectedDay.format('DD-MM-YYYY')) {
                className += 'selected'
            }
            items.push(<span key={i}
                             className={className}
                             onClick={() => this.selectItem(i)}>{day.format('D')}</span>)
        }
        return items
    }

    generateAbbreviations () {
        const abbreviations = [];
        for(let i = 0; i < 7; i++)
            abbreviations.push(<span key={i}
                                     className={'Calendar-days-os-week-item'}>
                                    {this.state.daysAbbreviation[i]}</span>);
        return abbreviations;
    }

    render() {
        const isHiden = this.state.isHiden ? 'close' : 'open'
        const month = moment().day(this.state.shift).format('MMMM');

        const items = this.generateDays();
        const abbreviations = this.generateAbbreviations();

        const weekStart = moment().day(this.state.shift).format('D');
        const weekStop = moment().day(this.state.shift + 6).format('D');

        let selectedDay = this.state.selectedDay;

        return (
            <div className={'Calendar'}>
                <div className={'Calendar-header'}>
                    <span className={'Calendar-header-btn'} onClick={() => this.onWeekChange(-7)}>PREV</span>
                    <div className={ 'Calendar-header-title '} onClick={() => this.onCalendarTitleClicked()}>
                        <span className={'title-text'}>{month} {weekStart}-{weekStop}</span>
                        <div className={'title-btn '  + isHiden }/>
                    </div>
                    <div className={ 'Calendar-header-dropdown ' + isHiden }>
                            <span className={'Calendar-desplay-type'} onClick={() => this.onThisDayClicked()}>This day</span>
                    </div>
                    <span className={'Calendar-header-btn'} onClick={() => this.onWeekChange(7)}>NEXT</span>
                </div>
                <div className={'Calendar-body'}>
                    <div className={'Calendar-days-os-week'}>
                        {abbreviations}
                    </div>
                    <div className={'Calendar-days'}>
                        {items}
                    </div>
                </div>
                <span className={'Calendar-selected-day'}>
                    {selectedDay.format('dddd')}, {selectedDay.format('D')} {selectedDay.format('MMMM')}
                </span>
            </div>
        );
    }
}

export default Calendar;
