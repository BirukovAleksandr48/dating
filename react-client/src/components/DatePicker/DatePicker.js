import React, {Component} from 'react';
import './DatePicker.sass';
import moment from 'moment';
import * as _ from 'lodash';

const monthsValue = {
    January: 31,
    February: 29,
    March: 31,
    April: 30,
    May: 31,
    June: 30,
    July: 31,
    August: 31,
    September: 30,
    October: 31,
    November: 30,
    December: 31
};

class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: "",
            month: "",
            year: ""
        };
    };

    componentDidMount() {
        if (!!this.props.value) {
            let age = this.props.value.split('-');
            this.setState({
                day: parseInt(age[2]),
                month: moment().month(age[1] - 1).format('MMMM'),
                year: parseInt(age[0])
            });
        }
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const state = {...this.state};
        if(!!state.day && !!state.month && !!state.year) {
            if(state.day !== prevState.day || state.month !== prevState.month || state.year !== prevState.year) {
                const month = moment().month(state.month).format('MM');
                const newAge = moment(state.day + '-' + month + '-' + state.year, 'DD-MM-YYYY').format('YYYY-MM-DD');
                this.props.onChange(newAge);
            }
        }
    };

    isYearLeap() {
        if (moment([this.state.year]).isLeapYear()) {
            monthsValue.February = 29
        }
        else {
            monthsValue.February = 28
        }
    };

    getDays() {
        let daysArr = [];
        this.isYearLeap();
        if (this.state.month) {
            if (this.state.day > monthsValue[this.state.month]) {
                this.day = ''
            }
            for (let i = 1; i < monthsValue[this.state.month] + 1; i++) {
                daysArr.push(i)
            }
        }
        else {
            for (let i = 1; i < 31 + 1; i++) {
                daysArr.push(i)
            }
        }
        return (
            <select
                className="days"
                name="day"
                value={this.state.day}
                onChange={this.handleSelectChange}
            >
                <option value="" />
                {_.map(daysArr, (value) => (
                    <option value={value} key={value}>{value}</option>
                ))}
            </select>
        );
    };

    getMonths() {
        return (
            <select
                className="months"
                name="month"
                value={this.state.month}
                onChange={this.handleSelectChange}
            >
                <option value=""/>
                {_.map(monthsValue, (value, monthName) => (
                    <option value={monthName} key={monthName}>{monthName}</option>
                ))}
            </select>
        );
    };

    getYears() {
        const yearsArr = [];
        for (let i = parseInt(moment().format('YYYY')); i > 1919; i--) {
            yearsArr.push(i)
        }
        return (<select
            className="years"
            name="year"
            value={this.state.year}
            onChange={this.handleSelectChange}>
            <option value=""/>
            {_.map(yearsArr, (value) => (
                <option value={value} key={value}>{value}</option>
            ))}
        </select>)
    }

    render() {
        const { title, color, size } = this.props;
        const titleClass = 'title ' + size;
        const datepickerClass = 'datepicker ' + size;
        return (
            <div className="DatePicker">
                <span className={titleClass} style={{color}}>
                    {title}
                </span>
                <div className={datepickerClass}>
                    {this.getDays()}
                    {this.getMonths()}
                    {this.getYears()}
                </div>
            </div>
        );
    }

    handleSelectChange = (event) => {
        event.preventDefault();
        const {name, value} = event.target;

        switch (name) {
            case "day":
                this.setState({day: value});
                break;
            case "month":
                this.setState({month: value});
                break;
            case "year":
                this.setState({year: value});
                break;
            default: {
            }
        }
    };

}

export default DatePicker;

