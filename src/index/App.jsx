import React, { Component } from 'react';
import { connect } from 'react-redux';
const App = () => {
  return <div className='App'>something;</div>;
};

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = dispatch => {
  //   return {};
};
// export default connect(function mapStateToProps (state){}, function mapDispatchToProps (dispatch){})(App);

export default connect(mapStateToProps, mapDispatchToProps)(App);
