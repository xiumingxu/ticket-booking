import React, { Component, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import Passengers from './Passengers.jsx';
import Ticket from './Ticket.jsx';
import Detail from '../common/Detail.jsx';
import Header from '../common/Header';

import URI from 'urijs';
import {
    setSearchParsed,
    setArriveStation,
    setDepartStation,
    setSeatType,
    setDepartDate,
    setTrainNumber,
    fetchInitial,
    createAdult,
    createChild,
    removePassenger
} from './actions.js';
import dayjs from 'dayjs';

import { bindActionCreators } from 'redux';
const App = props => {
    const {
        trainNumber,
        arriveStation,
        departStation,
        seatType,
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        price,
        durationStr,
        passengers,
        menu,
        isMenuVisible,
        searchParsed,

        dispatch
    } = props;

    //向自组件传入的函数, 最好用 callback, 每次 app 传入都是一个句柄, header 就不用做无谓的渲染了
    const onBack = useCallback(() => {
        window.history.back();
    }, []);
    //解析 url 参数
    useEffect(() => {
        const queries = URI.parseQuery(window.location.search);
        const { trainNumber, aStation, dStation, type, date } = queries;

        // 放到redux里
        dispatch(setArriveStation(dStation));
        dispatch(setDepartStation(aStation));
        dispatch(setSeatType(type));
        dispatch(setDepartDate(dayjs(date).valueOf()));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setSearchParsed(true));
    }, []);

    //发起异步请求 需要 searchParsed 才能发起, 获取departTimeStr
    useEffect(
        () => {
            if (!searchParsed) {
                return;
            }
            const url = new URI('rest/order')
                .setSearch('dStation', departStation)
                .setSearch('aStation', arriveStation)
                .setSearch('type', seatType)
                .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
                .toString();
            //这样才能才能 fetch
            dispatch(fetchInitial);
        },
        [ searchParsed ]
    );

    const passengersCbs = useMemo(() => {
        return bindActionCreators(
            {
                createAdult,
                createChild,
                removePassenger
            },
            dispatch
        );
    }, []);
    return (
        <div className="App">
            <div className="header-wrapper">
                <Header title="Order Form" />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    arriveDate={arriveDate}
                    departTimeStr={departTimeStr}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    departStation={departStation}
                    arriveStation={arriveStation}
                    durationStr={durationStr}>
                    <span style={{ display: 'block' }} className="train-icon" />
                </Detail>
            </div>
            <Ticket price={price} type={seatType} />
            {/* 给 add child 和 add adiult 中的 */}
            <Passengers passengers={passengers} {...passengersCbs} />
        </div>
    );
};

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
