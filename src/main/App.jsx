import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Highway from './Highway';
import Journey from './Journey';
import DepartDate from './DepartDate';

import { exchangeFromTo, showCitySelector } from './actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const App = props => {
  const { from, to, dispatch } = props;
  const onBack = useCallback(() => {
    window.history.back();
  }, []);

  return (
    <div className="App">
      <div className="header-wrapper">
        <Header title="Booking" goBack={onBack} />
      </div>
      <Journey
        from={from}
        to={to}
        //!!!
        exchangeFromTo={() => dispatch(exchangeFromTo())}
        showCitySelector={() => dispatch(showCitySelector)}
      />
      <DepartDate />
      <Highway />
    </div>
  );
};

const mapStateToProps = state => {
  return state;
};
const mapDispatchToProps = dispatch => {
  return { dispatch };
};

App.propTypes = {
  from     : PropTypes.string,
  to       : PropTypes.string,
  dispatch : PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
