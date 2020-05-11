// import {combineReducers} from 'react-redux';
// 这里 combinedreducer 是好几个文件的 reducer 吧

import {
  SET_DEPART_DATE,
  SET_ARRIVE_DATE,
  SET_DEPART_TIME,
  SET_ARRIVE_TIME,
  SET_DEPART_STATION,
  SET_ARRIVE_STATION,
  SET_TRAIN_NUMBER,
  SET_DURATION_STR,
  SET_TICKETS,
  SET_IS_SCHEDULE_VISIBLE,
  SET_SEARCH_PARSED
} from "./actions.js";
// reducer 里付初始值
export default {
  departDate(state = Date.now(), action) {
    const { type, payload } = action;
    console.log("type, type", type);
    switch (type) {
      case SET_DEPART_DATE:
        return payload;
    }
    return state;
  },
  arriveDate(state = Date.now(), action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ARRIVE_DATE:
        return payload;
      default:
        return state;
    }
  },
  // 关于 名称/ str 都是 null
  departTime(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_DEPART_TIME:
        return payload;
      default:
        return state;
    }
  },
  arriveTime(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ARRIVE_TIME:
        return payload;
      default:
        return state;
    }
  },
  departStation(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_DEPART_STATION:
        return payload;
      default:
        return state;
    }
  },
  arriveStation(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_ARRIVE_STATION:
        return payload;
      default:
        return state;
    }
  },
  trainNumber(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_TRAIN_NUMBER:
        return payload;
      default:
        return state;
    }
  },
  durationStr(state = null, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_DURATION_STR:
        return payload;
      default:
        return state;
    }
  },
  tickets(state = [], action) {
    const { type, payload } = action;
    switch (type) {
      case SET_TICKETS:
        return payload;
      default:
        return state;
    }
  },
  isScheduleVisible(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_IS_SCHEDULE_VISIBLE:
        return payload;
      default:
        return state;
    }
  },
  searchParsed(state = false, action) {
    const { type, payload } = action;
    switch (type) {
      case SET_SEARCH_PARSED:
        return payload;
      default:
        return state;
    }
  }
};
