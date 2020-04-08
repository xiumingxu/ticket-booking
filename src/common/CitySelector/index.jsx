import React, { Component, useEffect } from 'react';
import CityList from '../CityList';
import './index.css';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CitySelector = props => {
    const { show, goBack, fetchCityData, isLoadingCityData, cityData } = props;
    useEffect(
        () => {
            if (!show || cityData || isLoadingCityData) {
                return;
            }

            fetchCityData();
        },
        [ show, cityData, isLoadingCityData ]
    );

    const outputCityList = () => {
        if (isLoadingCityData) {
            return;
        }
        else if (cityData) {
            return <CityList sections={cityData.cityList} />;
        }
        //if not loading than, there is an error
        return <div> Error </div>;
    };

    return (
        <div className={classnames('city-selector', { hidden: !show })}>
            <div className="city-search">
                <div className="search-back" onClick={goBack}>
                    <svg width="42" height="42">
                        <polyline points="25,13 16,21 25,29" stroke="#fff" strokeWidth="2" fill="none" />
                    </svg>
                </div>
                <div className={classnames('search-input-wrapper')}>
                    <input className={classnames('search-input')} type="text" placeholder="city input" />
                </div>
            </div>
            {outputCityList()}
        </div>
    );
};

CitySelector.propTypes = {
    show              : PropTypes.bool.isRequired,
    isLoadingCityData : PropTypes.bool.isRequired,
    goBack            : PropTypes.func.isRequired,
    fetchCityData     : PropTypes.func.isRequired,
    cityData          : PropTypes.object
};

export default CitySelector;
