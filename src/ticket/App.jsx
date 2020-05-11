/*eslint-disable */
import React, { useEffect, useCallback, useMemo, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TrainContext } from './trainContext';

import URI from 'urijs';
import {
    toggleIsScheduleVisible,
    setDepartStation,
    setArriveStation,
    setDepartDate,
    setSearchParsed,
    setTrainNumber,
    prevDate,
    nextDate,
    setDepartTimeStr,
    setArriveTimeStr,
    setArriveDate,
    setDurationStr,
    setTickets
} from './actions';
import DateNav from '../common/DateNav';
import { h0 } from '../common/utils/fp';
import dayjs from 'dayjs';
import './App.css';
import Detail from './Detail.jsx';

import useNav from '../common/hooks/useNav';
import Header from '../common/Header';

import Candidate from './Candidate.jsx';

const Schedule = lazy(() => import('./Schedule.jsx'));

/* eslint react/prop-types: 0 */
const App = props => {
    const {
        departDate,
        arriveDate,
        departTimeStr,
        arriveTimeStr,
        departStation,
        arriveStation,
        trainNumber,

        durationStr,
        tickets,
        isScheduleVisible,
        searchParsed,

        dispatch
    } = props;

    const parseURL = url => {
        console.log(url);
        const queries = URI.parseQuery(url);
        // @ts-ignore
        const { aStation, dStation, date, trainNumber } = queries;

        dispatch(setDepartStation(aStation));
        dispatch(setArriveStation(dStation));
        dispatch(setTrainNumber(trainNumber));
        dispatch(setDepartDate(h0(dayjs(date).valueOf())));
        dispatch(setSearchParsed(true));
    };

    useEffect(
        () => {
            document.title = trainNumber;
        },
        [ trainNumber ]
    );

    useEffect(
        () => {
            if (!searchParsed) {
                return;
            }

            const url = new URI('/rest/ticket')
                .setSearch('date', dayjs(departDate).format('YYYY-MM-DD'))
                .setSearch('trainNumber', trainNumber)
                .toString();

            fetch(url).then(response => response.json()).then(result => {
                const { detail, candidates } = result;

                const { departTimeStr, arriveTimeStr, arriveDate, durationStr } = detail;

                dispatch(setDepartTimeStr(departTimeStr));
                dispatch(setArriveTimeStr(arriveTimeStr));
                dispatch(setArriveDate(arriveDate));
                dispatch(setDurationStr(durationStr));
                dispatch(setTickets(candidates));
            });
        },
        [ searchParsed, departDate, trainNumber ]
    );
    // can only use construct
    const {
        prev           : handleClickPrevDate,
        next           : handleClickNextDate,
        isPrevDisabled,
        isNextDsiabled
    } = useNav(departDate, dispatch, prevDate, nextDate);

    const onBack = useCallback(() => {
        window.history.back();
    }, []);

    useEffect(() => parseURL(window.location.search), [ window.location.search ]);

    // all the hooks should be before the return
    const detailCbs = useMemo(() => {
        return bindActionCreators(
            {
                toggleIsScheduleVisible
            },
            dispatch
        );
    }, []);

    if (!searchParsed) return null;

    return (
        <div className="App">
            <div className="header-wrapper">
                <Header title={trainNumber} goBack={onBack} />
            </div>
            <div className="nav-wrapper">
                <DateNav
                    date={departDate}
                    isPrevDisabled={isPrevDisabled}
                    isNextDisabled={isNextDsiabled}
                    onPrevClick={handleClickPrevDate}
                    onNextClick={handleClickNextDate}
                />
            </div>
            <div className="detail-wrapper">
                <Detail
                    departDate={departDate}
                    departStation={departStation}
                    departTimeStr={departTimeStr}
                    arriveDate={arriveDate}
                    arriveStation={arriveStation}
                    arriveTimeStr={arriveTimeStr}
                    trainNumber={trainNumber}
                    {...detailCbs}>
                    <span className="left" />
                    <span className="schedule" onClick={() => detailCbs.toggleIsScheduleVisible()}>
                        Schedule
                    </span>
                    <span className="right" />
                </Detail>
            </div>
            <TrainContext.Provider
                value={{
                    trainNumber,
                    departStation,
                    arriveStation,
                    departDate
                }}>
                <Candidate tickets={tickets} />
            </TrainContext.Provider>
            {isScheduleVisible && (
                <div className="mask" onClick={() => dispatch(toggleIsScheduleVisible())}>
                    <Suspense fallback={<div>loading...</div>}>
                        <Schedule
                            date={departDate}
                            trainNumber={trainNumber}
                            departStation={departStation}
                            arriveStation={arriveStation}
                        />
                    </Suspense>
                </div>
            )}
        </div>
    );
};
const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    dispatch,
    setDepartStation,
    setArriveStation,
    setTrainNumber,
    setDepartDate,
    setSearchParsed
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
