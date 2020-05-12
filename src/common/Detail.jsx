import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import './Detail.css';
import { format } from '../common/utils/utils';

const Detail = props => {
    const {
        departDate,
        departStation = 'Beijing',
        departTimeStr = '',
        arriveDate,
        arriveStation = 'Beijing2',
        arriveTimeStr = '',
        trainNumber = '',
        durationStr = ''
    } = props;

    const departDateStr = useMemo(() => format(departDate), [ departDate ]);
    const arriveDateStr = useMemo(() => format(arriveDate), [ arriveDate ]);
    return (
        <div className="detail">
            <div className="content">
                <div className="left">
                    <p className="city">{departStation}</p>
                    <p className="time">{departTimeStr}</p>
                    <p className="date">{departDateStr}</p>
                </div>
                <div className="middle">
                    <p className="train-name">{trainNumber}</p>
                    <p className="train-mid">{props.children}</p>
                    <p className="train-time">Total Duration{durationStr}</p>
                </div>
                <div className="right">
                    <p className="city">{arriveStation}</p>
                    <p className="time">{arriveTimeStr}</p>
                    <p className="date">{arriveDateStr}</p>
                </div>
            </div>
        </div>
    );
};

Detail.propTypes = {
    departDate    : PropTypes.number.isRequired,
    departStation : PropTypes.string.isRequired,
    departTimeStr : PropTypes.string.isRequired,
    arriveDate    : PropTypes.number.isRequired,
    arriveStation : PropTypes.string.isRequired,
    arriveTimeStr : PropTypes.string.isRequired,
    trainNumber   : PropTypes.string.isRequired,
    durationStr   : PropTypes.string.isRequired,
    children      : PropTypes.instanceOf(Element)
};

export default Detail;
