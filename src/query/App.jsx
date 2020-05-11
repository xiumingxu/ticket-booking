import React, { Component } from "react";
import { connect } from "react-redux";
import "./App.css";

const App = () => {
  return <div className="App" />;
};

export default connect(
  function mapStateToProps() {},
  function mapDispatchToProps(dispatch) {}
)(App);
