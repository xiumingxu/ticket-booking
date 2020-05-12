/* eslint-disable react/display-name */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Ticket.css';

const Ticket = memo(props => {
    const { price, type } = props;
    return (
        <div className="ticket">
            <p>
                <span className="ticket-type"> {type}</span>
                <span className="ticket-price"> {price} </span>
            </p>
            <div className="label"> seat type</div>
        </div>
    );
});

Ticket.propTypes = {};

export default Ticket;
