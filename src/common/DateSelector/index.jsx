import React, { Component, useEffect } from 'react';
import './index.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Header from '../../common/Header';
import { h0 } from '../../common/fp';
function Day (props) {
    const { day, onSelect } = props;

    if (!day) {
        return <td className="null" />;
    }

    const classes = [];

    const now = h0();

    if (day < now) {
        classes.push('disabled');
    }

    if ([ 6, 0 ].includes(new Date(day).getDay())) {
        classes.push('weekend');
    }

    const dateString = now === day ? '今天' : new Date(day).getDate();

    return (
        <td className={classnames(classes)} onClick={() => onSelect(day)}>
            {dateString}
        </td>
    );
}

Day.propTypes = {
    day      : PropTypes.number,
    onSelect : PropTypes.func.isRequired
};

function Week (props) {
    const { days, onSelect } = props;

    return (
        <tr className="date-table-days">
            {days.map((day, idx) => {
                return <Day key={idx} day={day} onSelect={onSelect} />;
            })}
        </tr>
    );
}

Week.propTypes = {
    days     : PropTypes.array.isRequired,
    onSelect : PropTypes.func.isRequired
};
const Month = ({ onSelect, firstDay }) => {
    //注意 timestamp 和  class date 的区别
    const startDay = new Date(firstDay);
    const weekHead = [ 'SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT' ];

    //把所有的 first day of the week 放进去
    // 找 curMoth
    const currentDay = new Date(firstDay);

    let days = [];
    // 先把所有的 days 放进去...
    while (currentDay.getMonth() === startDay.getMonth()) {
        days.push(currentDay.getTime());
        currentDay.setDate(currentDay.getDate() + 1);
    }

    days = new Array(startDay.getDay() ? startDay.getDay() - 1 : 6).fill(null).concat(days);

    const lastDay = new Date(days[days.length - 1]);

    days = days.concat(new Array(lastDay.getDay() ? 7 - lastDay.getDay() : 0).fill(null));
    const curMonth = startDay.getMonth();

    const weeks = [];
    for (let row = 0; row < days.length / 7; ++row) {
        const week = days.slice(row * 7, (row + 1) * 7);
        weeks.push(week);
    }
    // console.log('weeekSquence', weekSequence);

    return (
        <table className="date-table">
            <thead>
                <tr>
                    <td colSpan="7">
                        <h5>
                            {startDay.getFullYear()} - {startDay.getMonth() + 1}
                        </h5>
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr className="data-table-weeks">
                    {weekHead.map((head, idx) => {
                        if (idx === 0 || idx === 6)
                            return (
                                <th key={idx} className="weekend">
                                    {head}
                                </th>
                            );
                        return <th key={idx}> {head}</th>;
                    })}
                </tr>

                {/* render the weeks */}
                {weeks.map((week, idx) => {
                    return <Week key={idx} days={week} onSelect={onSelect} />;
                })}
            </tbody>
        </table>
    );
};

Month.propTypes = {
    onSelect : PropTypes.func.isRequired,
    firstDay : PropTypes.number.isRequired
};
const DateSelector = props => {
    const { show, onBack, onSelect = () => {} } = props;
    // 以今天为准???// get timestamp for 1, 2, 3 months
    const getFirstDayofCurrentMonth = () => {
        const now = new Date();
        now.setHours(0);
        now.setMinutes(0);
        now.setSeconds(0);
        now.setMilliseconds(0);
        now.setDate(1);
        return now;
    };
    const firstDayForCurMonth = getFirstDayofCurrentMonth();

    const monthSequence = [ firstDayForCurMonth.getTime() ];
    firstDayForCurMonth.setMonth(firstDayForCurMonth.getMonth() + 1);
    monthSequence.push(firstDayForCurMonth.getTime());
    firstDayForCurMonth.setMonth(firstDayForCurMonth.getMonth() + 1);
    monthSequence.push(firstDayForCurMonth.getTime());

    return (
        <div className={classnames({ hidden: !show }, 'date-selector')}>
            <Header goBack={onBack} title="Select Date" />
            <div className="date-selector-tables">
                {monthSequence.map((timeStamp, idx) => <Month key={idx} firstDay={timeStamp} onSelect={onSelect} />)}
            </div>
        </div>
    );
};

DateSelector.propTypes = {
    show     : PropTypes.bool.isRequired,
    onBack   : PropTypes.func.isRequired,
    onSelect : PropTypes.func.isRequired
};

export default DateSelector;
