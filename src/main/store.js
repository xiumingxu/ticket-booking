import { createStore, combineReducers, applyMiddleware } from 'redux';

import reducers from './reducers';
import thunk from 'redux-thunk';

//搞外面的数据
export default createStore(
    combineReducers(reducers),
    {
        from                     : 'Munich',
        to                       : 'Milan',
        isCitySelectorVisible    : false,
        currentSelectingLeftCity : true,
        cityData                 : null,
        isLoadingCityData        : false,

        highSpeed                : false,
        isDateSelectorVisible    : false
    },
    applyMiddleware(thunk)
);
