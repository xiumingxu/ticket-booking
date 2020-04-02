import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import Highway from './Highway';
import Journey from './Journey';
import DepartDate from './DepartDate';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <Journey />
      <DepartDate />
      <Highway />
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  //   return {};
};
// export default connect(function mapStateToProps (state){}, function mapDispatchToProps (dispatch){})(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);
