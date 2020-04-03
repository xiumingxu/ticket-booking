import React, { Component } from 'react';
import './index.css';
import PropTypes from 'prop-types';

const BackButton = () => {
  return (
    <>
      <svg width="42" height="42">
        <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none" />
      </svg>
    </>
  );
};

const Header = props => {
  const { title, goBack } = props;

  return (
    <div className="header">
      <div className="header-back" onClick={goBack}>
        <BackButton />
      </div>
      <h1 className="header-title">{title}</h1>
    </div>
  );
};

Header.propTypes = {
  title  : PropTypes.string.isRequired,
  goBack : PropTypes.func.isRequired
};

export default Header;
