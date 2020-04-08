import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import CitySelector from '../common/CitySelector';
import Highway from './Highway';
import Journey from './Journey';
import DepartDate from './DepartDate';

import { exchangeFromTo, showCitySelector, hideCitySelector, fetchCityData } from './actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const App = props => {
    let { from, to, dispatch, isCitySelectorVisible, cityData, isLoadingCityData } = props;

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    const journeyCallbacks = useMemo(() => {
        return bindActionCreators(
            {
                exchangeFromTo,
                showCitySelector
            },
            dispatch
        );
    }, []);

    // const citySelectorCBs = useMemo(() => bindActionCreators({ fetchCityData }, dispatch), []);

    const citySelectorCBs = useMemo(() => {
        //可以换名字
        return bindActionCreators(
            {
                onBack        : hideCitySelector,
                fetchCityData
            },
            dispatch
        );
    }, []);

    return (
        <div className="App">
            <div className="header-wrapper">
                <Header title="Booking" goBack={onBack} />
            </div>
            <Journey
                from={from}
                to={to}
                {...journeyCallbacks}
                // exchangeFromTo={() => dispatch(exchangeFromTo())}
                // showCitySelector={() => dispatch(showCitySelector)}
            />
            <DepartDate />
            <Highway />
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoadingCityData={isLoadingCityData}
                {...citySelectorCBs}
                goBack={() => dispatch(hideCitySelector())}
            />
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
    from                  : PropTypes.string,
    to                    : PropTypes.string,
    isCitySelectorVisible : PropTypes.bool,
    cityData              : PropTypes.object,
    dispatch              : PropTypes.func.isRequired,
    isLoadingCityData     : PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
