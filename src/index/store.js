import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import reducers from "./reducers";
import thunk from "redux-thunk";

//搞外面的数据
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default createStore(
  combineReducers(reducers),
  {
    from: "Munich",
    to: "Milan",
    isCitySelectorVisible: false,
    currentSelectingLeftCity: true,
    cityData: null,
    isLoadingCityData: false,

    highSpeed: false,
    //show it for debugging
    isDateSelectorVisible: true,
    //这里计算了当前世界, 且所有界面传递
    departDate: Date.now()
  },
  composeEnhancers(applyMiddleware(thunk))
  // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
);
