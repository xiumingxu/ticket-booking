import { Component } from 'react';
import { connect } from 'react-redux';
class App extends Component {}

export default connect(function mapStateToProps (state){}, function mapDispatchToProps (dispatch){})(App);
