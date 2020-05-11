/* eslint-disable react/display-name */
import './Schedule.css';
// @ts-ignore
import PropTypes from 'prop-types';
import React, { memo, useState, useEffect } from 'react';
import URI from 'urijs';
import leftPad from 'left-pad';
import classnames from 'classnames';
import dayjs from 'dayjs';
/* eslint react/prop-types: 0 */
const ScheduleRow = memo(props => {
    const {
        // @ts-ignore
        index,
        // @ts-ignore
        station,
        // @ts-ignore
        arriveTime,
        // @ts-ignore
        departTime,
        // @ts-ignore
        stay,
        /* 根据不同属性, 每一行的样式不同 */
        // @ts-ignore
        isDepartStation,
        // @ts-ignore
        isArriveStation,
        // @ts-ignore
        isStartStation,
        // @ts-ignore
        isEndStation,
        // @ts-ignore
        beforeDepartStation,
        // @ts-ignore
        afterArriveStation
    } = props;

    return (
        <li className="schedule-row">
            {/* 动态生成不同的类 */}
            <div
                className={classnames('icon', {
                    'icon-red' : isDepartStation || isDepartStation
                })}>
                {isDepartStation ? 'Dept' : isArriveStation ? 'Dest' : leftPad(index, 2, 0)}
            </div>
            <div
                className={classnames('row', {
                    grey : beforeDepartStation || afterArriveStation
                })}>
                <span
                    className={classnames('station', {
                        red : isArriveStation || isDepartStation
                    })}>
                    {station}{' '}
                </span>
                <span
                    className={classnames('arrtime', {
                        red : isArriveStation
                    })}>
                    {isStartStation ? 'StartStation' : arriveTime}
                </span>
                <span
                    className={classnames('deptime', {
                        red : isDepartStation
                    })}>
                    {isEndStation ? (
                        'EndStation'
                    ) : (
                        // @ts-ignore
                        departTime
                    )}
                </span>
                <span className="stoptime">{isStartStation || isEndStation ? '-' : stay + 'min'}</span>
            </div>
        </li>
    );
});
// @ts-ignore
ScheduleRow.propTypes = {};
const Schedule = memo(props => {
    // @ts-ignore
    const { date, trainNumber, departStation, arriveStation } = props;
    const [ scheduleList, setScheduleList ] = useState([]);

    // 把整个数据给加属性了
    useEffect(
        () => {
            const url = new URI('rest/schedule')
                .setSearch('trainNumber', trainNumber)
                .setSearch('departStation', departStation)
                .setSearch('arriveStation', arriveStation)
                .setSearch('date', dayjs(date).format('YYYY-MM-DD'));
            // @ts-ignore
            fetch(url).then(rsp => rsp.json()).then(data => {
                let departRow;
                let arriveRow;
                // 遍历 data 把属性重构
                for (let i = 0; i < data.length; i++) {
                    // 首先 是不是出发车站, 要么在 before, 要么就是
                    if (!departRow) {
                        if (data[i].station === departStation) {
                            departRow = Object.assign(data[i], {
                                beforeDepartStation : false,
                                isDepartStation     : true,
                                isArriveStation     : false,
                                afterArriveStation  : false
                            });
                        }
                        else {
                            Object.assign(data[i], {
                                beforeDepartStation : true,
                                isDepartStation     : false,
                                isArriveStation     : false,
                                afterArriveStation  : false
                            });
                        }
                    }
                    else if (!arriveRow) {
                        if (data[i].station === arriveStation) {
                            arriveRow = Object.assign(data[i], {
                                beforeDepartStation : false,
                                isDepartStation     : false,
                                isArriveStation     : false,
                                afterArriveStation  : true
                            });
                        }
                        else {
                            //如果既不是不是到达 则是中途经过的车站
                            Object.assign(data[i], {
                                beforeDepartStation : false,
                                isDepartStation     : false,
                                isArriveStation     : false,
                                afterArriveStation  : false
                            });
                        }
                    }
                    else {
                        Object.assign(data[i], {
                            beforeDepartStation : false,
                            isDepartStation     : true,
                            isArriveStation     : false,
                            afterArriveStation  : true
                        });
                    }
                    //最后两个属性
                    Object.assign(data[i], {
                        isStartStation : i === 0,
                        isEndStation   : i === data.length - 1
                    });
                }
                setScheduleList(data);
            });
        },
        [ date, trainNumber, departStation, arriveStation ]
    );

    return (
        <div className="schedule">
            <div className="dialog">
                <h1> Schedule List </h1>
                <div className="head">
                    <span className="station"> Station </span>
                    <span className="station"> Station </span>
                    <span className="station"> Station </span>
                    <span className="station"> Station </span>
                </div>
                <ul>
                    {scheduleList.length !== 0 &&
                        scheduleList.map((r, idx) => (
                            /* <ScheduleRow
                    index={idx}
                    station={station}
                    arriveTime={arriveTime}
                    departTime={departTime}
                    stay={stay}

                    
                    isDepartStation={isDepartStation}
                    isArriveStation={isArriveStation}
                    isStartStation={isStartStation}
                    isEndStation={isEndStation}
                    beforeDepartStation={beforeDepartStation}
                    afterArriveStation={afterArriveStation}
                /> */
                            <ScheduleRow key={r.station} index={idx + 1} {...r} />
                        ))}
                </ul>
            </div>
        </div>
    );
});

// Schedule.propTypes = {
//     date          : PropTypes.number.isRequired,
//     trainNumber   : PropTypes.string.isRequired,
//     departStation : PropTypes.string.isRequired,
//     arriveStation : PropTypes.string.isRequired
// };

export default Schedule;
