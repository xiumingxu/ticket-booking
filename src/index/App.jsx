import React, { Component } from 'react';
import { connect } from 'react-redux';
function App (){
  return <div className='App'>something;</div>;
}

export default connect(function mapStateToProps (state){}, function mapDispatchToProps (dispatch){})(App);

/* <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className='App-link' href='https://reactjs.org' target='_blank' rel='noopener noreferrer'>
          Learn React
        </a>
      </header> */
