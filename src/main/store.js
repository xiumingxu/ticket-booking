import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

export default createStore(
  combineReducers(reducers),
  {
    from                     : 'Munich',
    to                       : 'Milan',
    isCitySelectorVisible    : true,
    currentSelectingLeftCity : true,
    //搞外面的数据
    cityData                 : null,
    isLoadingCityData        : false,

    highSpeed                : false,
    isDateSelectorVisible    : false
  },
  applyMiddleware(thunk)
);
