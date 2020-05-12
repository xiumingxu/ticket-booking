export const SET_TRAIN_NUMBER = 'SET_TRAIN_NUMBER';
export const SET_ARRIVE_STATION = 'SET_ARRIVE_STATION';
export const SET_DEPART_STATION = 'SET_DEPART_STATION';
export const SET_SEAT_TYPE = 'SET_SEAT_TYPE';
export const SET_DEPART_DATE = 'SET_DEPART_DATE';
export const SET_ARRIVE_DATE = 'SET_ARRIVE_DATE';
export const SET_DEPART_TIME_STR = 'SET_DEPART_TIME_STR';
export const SET_ARRIVE_TIME_STR = 'SET_ARRIVE_TIME_STR';
export const SET_PRICE = 'SET_PRICE';
export const SET_DURATION_STR = 'SET_DURATION_STR';
export const SET_PASSENGERS = 'SET_PASSENGERS';
export const SET_MENU = 'SET_MENU';
export const SET_IS_MENU_VISIBLE = 'SET_IS_MENU_VISIBLE';
export const SET_SEARCH_PARSED = 'SET_SEARCH_PARSED';

export function setTrainNumber (trainNumber) {
    return {
        type    : 'SET_TRAIN_NUMBER',
        payload : trainNumber
    };
}
export function setArriveStation (arriveStation) {
    return {
        type    : 'SET_ARRIVE_STATION',
        payload : arriveStation
    };
}
export function setDepartStation (departStation) {
    return {
        type    : 'SET_DEPART_STATION',
        payload : departStation
    };
}
export function setSeatType (seatType) {
    return {
        type    : 'SET_SEAT_TYPE',
        payload : seatType
    };
}
export function setDepartDate (departDate) {
    return {
        type    : 'SET_DEPART_DATE',
        payload : departDate
    };
}
export function setArriveDate (arriveDate) {
    return {
        type    : 'SET_ARRIVE_DATE',
        payload : arriveDate
    };
}
export function setDepartTimeStr (departTimeStr) {
    return {
        type    : 'SET_DEPART_TIME_STR',
        payload : departTimeStr
    };
}
export function setArriveTimeStr (arriveTimeStr) {
    return {
        type    : 'SET_ARRIVE_TIME_STR',
        payload : arriveTimeStr
    };
}
export function setPrice (price) {
    return {
        type    : 'SET_PRICE',
        payload : price
    };
}
export function setDurationStr (durationStr) {
    return {
        type    : 'SET_DURATION_STR',
        payload : durationStr
    };
}
export function setPassengers (passengers) {
    return {
        type    : 'SET_PASSENGERS',
        payload : passengers
    };
}
export function setMenu (menu) {
    return {
        type    : 'SET_MENU',
        payload : menu
    };
}
export function setIsMenuVisible (isMenuVisible) {
    return {
        type    : 'SET_IS_MENU_VISIBLE',
        payload : isMenuVisible
    };
}
export function setSearchParsed (searchParsed) {
    return {
        type    : 'SET_SEARCH_PARSED',
        payload : searchParsed
    };
}

export function fetchInitial (url) {
    return (dispatch, getState) => {
        fetch(url).then(res => res.json()).then(data => {
            const { departTimeStr, arriveTimeStr, arriveDate, durationStr, price } = data;
            dispatch(setDepartTimeStr(departTimeStr));
            dispatch(setArriveTimeStr(arriveTimeStr));
            dispatch(setArriveDate(arriveDate));
            dispatch(setDurationStr(durationStr));
            dispatch(setPrice(price));
        });
    };
}
//关于成人/孩子的添加

let passengerIdSeed = 0;

export function createAdult () {
    return (dispatch, getState) => {
        const { passengers } = getState();
        //检查之前的是否都好使
        for (const passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }
        }

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id         : ++passengerIdSeed,
                    name       : null,
                    ticketType : 'adult',
                    licenseNo  : '',
                    seat       : 'Z'
                }
            ])
        );
    };
}

// 有个 followadult
export function createChild () {
    return (dispatch, getState) => {
        const { passengers } = getState();
        let adultfound = false;
        //检查之前的是否都好使
        for (const passenger of passengers) {
            const keys = Object.keys(passenger);
            for (let key of keys) {
                if (!passenger[key]) {
                    return;
                }
            }
            if (passenger.ticketType === 'adult') {
                adultfound = true;
            }
        }
        if (!adultfound) {
            alert('please add one adult');
            return;
        }

        dispatch(
            setPassengers([
                ...passengers,
                {
                    id          : ++passengerIdSeed,
                    name        : '',
                    gender      : 'none',
                    birthday    : '',
                    followAdult : '',
                    ticketType  : 'child',
                    seat        : 'Z'
                }
            ])
        );
    };
}
export const removePassenger = id => async (dispatch, getState) => {
    const { passengers } = getState();
    const newPassengers = passengers.filter(passenger => {
        return passenger.id !== id && passenger.followAdult !== id;
    });

    dispatch(setPassengers(newPassengers));
};
export function updatePassenger (id, data, keysToBeRemoved = []) {
    return (dispatch, getState) => {
        const { passengers } = getState();

        for (let i = 0; i < passengers.length; ++i) {
            if (passengers[i].id === id) {
                const newPassengers = [ ...passengers ];
                newPassengers[i] = Object.assign({}, passengers[i], data);
                // to delete 还是要看一下
                for (let key of keysToBeRemoved) {
                    delete newPassengers[i][key];
                }

                dispatch(setPassengers(newPassengers));
                break;
            }
        }
    };
}

//弹出菜单
export const showMenu = menu => async (dispatch, getState) => {
    dispatch(setMenu(menu));
    dispatch(setIsMenuVisible(true));
};

// export const hideMenu = _ => dispatch => {
//     dispatch(setIsMenuVisible(false));
// };
export const hideMenu = _ => {
    return setIsMenuVisible(false);
};
