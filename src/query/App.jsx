import React, { Component } from 'react';
import { connect } from 'react-redux';
class App extends Component {
  render () {
    return <div className="App">something;</div>;
  }
}

export default connect(function mapStateToProps () {}, function mapDispatchToProps (dispatch) {})(App);
