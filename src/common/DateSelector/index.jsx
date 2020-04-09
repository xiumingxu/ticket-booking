import React, { Component, useEffect } from 'react';
import './index.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Header from '../../common/Header';

const DateSelector = props => {
    const { show, onBack } = props;
    return (
        <div className={classnames({ hidden: !show }, 'date-selector')}>
            <Header goBack={onBack} title="Select Date" />
            something
        </div>
    );
};

DateSelector.propTypes = {
    show   : PropTypes.bool.isRequired,
    onBack : PropTypes.func.isRequired
};

export default DateSelector;
