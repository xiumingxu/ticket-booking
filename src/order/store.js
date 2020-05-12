import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
    combineReducers(reducers),
    {
        //所有的状态的初始值
        // url 中的所有参数
        trainNumber   : null,
        arriveStation : null,
        departStation : null,
        seatType      : null,
        departDate    : Date.now(),
        //unix 时间戳
        arriveDate    : Date.now(),

        departTimeStr : null,
        arriveTimeStr : null,
        price         : null,
        durationStr   : null,

        //页面操作
        // 选座信息
        passengers    : [],
        // 弹出菜单
        menu          : null,
        isMenuVisible : false,
        // url 是否解析完成
        searchParsed  : false
    },
    applyMiddleware(thunk)
);
