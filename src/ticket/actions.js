import { h0 } from "../common/utils/fp";
export const SET_DEPART_DATE = "SET_DEPART_DATE";
export const SET_ARRIVE_DATE = "SET_ARRIVE_DATE";
export const SET_DEPART_TIME = "SET_DEPART_TIME";
export const SET_ARRIVE_TIME = "SET_ARRIVE_TIME";
export const SET_DEPART_STATION = "SET_DEPART_STATION";
export const SET_ARRIVE_STATION = "SET_ARRIVE_STATION";
export const SET_TRAIN_NUMBER = "SET_TRAIN_NUMBER";
export const SET_DURATION_STR = "SET_DURATION_STR";
export const SET_TICKETS = "SET_TICKETS";
export const SET_IS_SCHEDULE_VISIBLE = "SET_IS_SCHEDULE_VISIBLE";
export const SET_SEARCH_PARSED = "SET_SEARCH_PARSED";

export const toggleIsScheduleVisible = () => async (dispatch, getState) => {
  const { isScheduleVisible } = getState();
  dispatch(setIsScheduleVisible(!isScheduleVisible));
};
// action 里不需要初始值, 而是 reducer 里有
export const setDepartDate = departDate => {
  return {
    type: SET_DEPART_DATE,
    payload: departDate
  };
};
export const setArriveDate = arriveDate => {
  return {
    type: SET_ARRIVE_DATE,
    payload: arriveDate
  };
};
export const setDepartTime = departTime => {
  return {
    type: SET_DEPART_TIME,
    payload: departTime
  };
};
export const setArriveTime = arriveTime => {
  return {
    type: SET_ARRIVE_TIME,
    payload: arriveTime
  };
};
export const setDepartStation = departStation => {
  console.log("SET_DEPART_STATIO,N", departStation);
  return {
    type: SET_DEPART_STATION,
    payload: departStation
  };
};
export const setArriveStation = arriveStation => {
  return {
    type: SET_ARRIVE_STATION,
    payload: arriveStation
  };
};
export const setTrainNumber = trainNumber => {
  return {
    type: SET_TRAIN_NUMBER,
    payload: trainNumber
  };
};
export const setDurationStr = durationStr => {
  return {
    type: SET_DURATION_STR,
    payload: durationStr
  };
};
export const setTickets = tickets => {
  return {
    type: SET_TICKETS,
    payload: tickets
  };
};
export const setIsScheduleVisible = isScheduleVisible => {
  return {
    type: SET_IS_SCHEDULE_VISIBLE,
    payload: isScheduleVisible
  };
};
export const setSearchParsed = searchParsed => {
  return {
    type: SET_SEARCH_PARSED,
    payload: searchParsed
  };
};
// some behavior date
export function nextDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();

    dispatch(setDepartDate(h0(departDate) + 86400 * 1000));
  };
}
export function prevDate() {
  return (dispatch, getState) => {
    const { departDate } = getState();

    dispatch(setDepartDate(h0(departDate) - 86400 * 1000));
  };
}
