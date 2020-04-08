import React from 'react';
// import { connect } from 'react-redux';
import './index.css';
import switchIcon from '../../assets/switch.svg';

import PropTypes from 'prop-types';

const Journey = props => {
  const { from, to, exchangeFromTo, showCitySelector } = props;
  return (
    <div className="journey">
      <div className="journey-station" onClick={() => showCitySelector(true)}>
        <input className="journey-input journey-from" type="text" readOnly value={from} />
      </div>
      <div className="journey-switch" onClick={() => exchangeFromTo()}>
        <img src={switchIcon} width="70" height="40" alt="switch" />
      </div>
      <div className="journey-station" onClick={() => showCitySelector(false)}>
        <input className="journey-input journey-to" type="text" readOnly value={to} />
      </div>
    </div>
  );
};

Journey.propTypes = {
  from             : PropTypes.string.isRequired,
  to               : PropTypes.string.isRequired,
  exchangeFromTo   : PropTypes.func.isRequired,
  showCitySelector : PropTypes.func.isRequired
};
export default Journey;
