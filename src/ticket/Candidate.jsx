/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import './Candidate.css';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import React, { memo, useState, useCallback, useContext, useMemo } from 'react';
import URI from 'urijs';
import { TrainContext } from './trainContext';

const Channel = memo(props => {
    const { name, desc, type } = props;

    const { trainNumber, departStation, arriveStation, departDate } = useContext(TrainContext);

    const link = useMemo(
        () => {
            return new URI('order.html')
                .setSearch('trainNumber', trainNumber)
                .setSearch('dStation', departStation)
                .setSearch('aStation', arriveStation)
                .setSearch('type', type)
                .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
                .toString();
        },
        [ trainNumber, departStation, arriveStation, departDate ]
    );

    return (
        <div className="channel">
            <div className="middle">
                <span className="name">{name}</span>
                <span className="desc">{desc}</span>
            </div>
            <a href={link}>
                <button type="submit">Buy Ticket</button>
            </a>
        </div>
    );
});
const Seat = memo(props => {
    const { type, priceType, ticketsLeft, channels, priceMsg, expanded = true, idx, onToggle } = props;

    return (
        <li>
            <div className="bar" onClick={() => onToggle(idx)}>
                <span className="seat">{type}</span>
                <span className="price">{priceMsg}</span>
                <span className="btn "> fold </span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div className="channels" style={{ height: expanded ? channels.length * 55 + 'px' : 0 }}>
                {channels.map(channel => {
                    return <Channel key={channel.name} {...channel} />;
                })}
            </div>
        </li>
    );
});

// eslint-disable-next-line react/display-name
const Candidate = memo(({ tickets }) => {
    const [ expandedIndex, setExpandedIndex ] = useState(0);

    const onToggle = useCallback(
        idx => {
            setExpandedIndex(expandedIndex === idx ? -1 : idx);
        },
        [ expandedIndex ]
    );
    return (
        <div className="candidate">
            <ul>
                {tickets.map((ticket, idx) => {
                    // onToggle={onToggle}
                    // expanded={expandedIndex === idx}
                    // key={ticket.type}
                    return <Seat idx={idx} {...ticket} expanded={idx === expandedIndex} onToggle={onToggle} />;
                })}
            </ul>
        </div>
    );
});
Candidate.propTypes = {
    tickets : PropTypes.array.isRequired
};

export default Candidate;
