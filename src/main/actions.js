export const ACTION_SET_FROM = 'SET_FROM';
export const ACTION_SET_TO = 'SET_TO';
export const ACTION_SET_IS_CITY_SELECTOR_VISIBLE = 'SET_IS_CITY_SELECTOR_VISIBLE';
export const ACTION_SET_CURRENT_SELECTING_LEFT_CITY = 'SET_CURRENT_SELECTING_LEFT_CITY';

export const ACTION_SET_IS_LOADING_CITY_DATA = 'SET_IS_LOADING_CITY_DATA';
export const ACTION_SET_HIGH_SPEED = 'SET_HIGH_SPEED';
export const ACTION_TOGGLE_HIGH_SPEED = 'TOGGLE_HIGH_SPEED';

export const ACTION_SET_IS_DATE_SELECTOR_VISIBLE = 'SET_IS_DATE_SELECTOR_VISIBLE';
export const ACTION_SET_CITY_DATA = 'SET_CITY_DATA';
export const ACTION_SET_DEPART_DATE = 'SET_DEPART_DATE';

// from
// to
// isCitySelectorVisible
// currentSelectingLeftCity
// cityDate
// isLoadingCityData
// highSpeed

export const setFrom = from => {
  return {
    type    : ACTION_SET_FROM,
    payload : from
  };
};
export const setTo = to => {
  return {
    type    : ACTION_SET_TO,
    payload : to
  };
};
// action
// export const setIsCitySelectorVisible = isCitySelectorVisible => {
//   return {
//     type    : ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
//     payload : isCitySelectorVisible
//   };
// };
//
export const showCitySelector = currentSelectingLeftCity => {
  //在这里有两个操作 所以也是异步的
  return dispatch => {
    dispatch({
      type    : ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
      payload : true
    });
    dispatch({
      type    : ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
      payload : currentSelectingLeftCity
    });
  };
};

export const hideCitySelector = () => {
  return {
    type    : ACTION_SET_IS_CITY_SELECTOR_VISIBLE,
    payload : false
  };
};
//
export const exchangeFromTo = () => {
  return (dispatch, getState) => {
    // 必须知道其他的, 才能决定下一步怎么走 --> 异步
    const { from, to } = getState();

    console.log(from, to);

    dispatch(setFrom(to));
    dispatch(setTo(from));
  };
};

// 这个又跟 set city 有关
export const setCurrentSelectingLeftCity = currentSelectingLeftCity => {
  return {
    type    : ACTION_SET_CURRENT_SELECTING_LEFT_CITY,
    payload : currentSelectingLeftCity
  };
};

export const setSelectedCity = city => {
  return (dispatch, getState) => {
    // 必须知道其他的, 才能决定下一步怎么走 --> 异步
    const { currentSelectingLeftCity } = getState();
    if (currentSelectingLeftCity) {
      //还要有 dispatch
      dispatch(setFrom(city));
    }
    else {
      dispatch(setTo(city));
    }
  };
};

export const setCityData = cityData => {
  return {
    type    : ACTION_SET_CITY_DATA,
    payload : cityData
  };
};
export const setIsLoadingCityData = isLoadingCityData => {
  return {
    type    : ACTION_SET_IS_LOADING_CITY_DATA,
    payload : isLoadingCityData
  };
};
export const setHighSpeed = highSpeed => {
  return {
    type    : ACTION_SET_HIGH_SPEED,
    payload : highSpeed
  };
};
// 也不全是 set
export const toggleHighSpeed = () => {
  return (dispath, getState) => {
    const { highSpeed } = getState();
    dispath({
      type    : ACTION_TOGGLE_HIGH_SPEED,
      payload : !highSpeed
    });
  };
};

// 这些都可以分开的;
// actions
export function showDateSelector () {
  return {
    type    : ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload : true
  };
}

export function hideDateSelector () {
  return {
    type    : ACTION_SET_IS_DATE_SELECTOR_VISIBLE,
    payload : false
  };
}
