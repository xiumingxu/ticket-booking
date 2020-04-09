import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import Header from '../common/Header';
import CitySelector from '../common/CitySelector';
import Highway from './Highway';
import Journey from './Journey';
import DepartDate from './DepartDate';
import DateSelector from '../common/DateSelector';
import './App.css';

import {
    exchangeFromTo,
    showDateSelector,
    showCitySelector,
    hideCitySelector,
    fetchCityData,
    hideDateSelector
} from './actions';

import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

const App = props => {
    let {
        from,
        to,
        dispatch,
        isCitySelectorVisible,
        isDateSelectorVisible,
        cityData,
        isLoadingCityData,
        departDate
    } = props;

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
    // const onDepartDateSelected = () => {
    //     dispatch(showDateSelector());
    // };

    const departDateCbs = useMemo(() => {
        return bindActionCreators(
            {
                // 直接用 onclick 做了
                onClick : showDateSelector
            },
            dispatch
        );
    }, []);

    // const dateSelectorCbs = useMemo(() => {
    // 不是执行, 而是 return
    //     bindActionCreators(
    //         {
    //             onBack : hideDateSelector
    //         },
    //         dispatch
    //     );
    // }, []);

    const dateSelectorCbs = useMemo(() => {
        return bindActionCreators(
            {
                onBack : hideDateSelector
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
            <DepartDate {...departDateCbs} date={departDate} />
            <Highway />
            <CitySelector
                show={isCitySelectorVisible}
                cityData={cityData}
                isLoadingCityData={isLoadingCityData}
                {...citySelectorCBs}
                goBack={() => dispatch(hideCitySelector())}
            />
            {/* 所有的空间都放在 app 里面了 */}
            {/* isDateSelectorVisible 是 state 也是 action 的函数名字 */}
            {/* //onSelect={onSelectDate} */}
            {/* // 注意 date 是怎么传递的 */}
            <DateSelector show={isDateSelectorVisible} {...dateSelectorCbs} />
        </div>
    );
};

const mapStateToProps = state => {
    return state;
};
const mapDispatchToProps = dispatch => {
    return { dispatch };
};

//都是 state 的值
App.propTypes = {
    from                  : PropTypes.string,
    to                    : PropTypes.string,
    isCitySelectorVisible : PropTypes.bool,
    isDateSelectorVisible : PropTypes.bool,
    cityData              : PropTypes.object,
    dispatch              : PropTypes.func.isRequired,
    isLoadingCityData     : PropTypes.bool,
    departDate            : PropTypes.number
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
