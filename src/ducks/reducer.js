import axios from "axios";

const initialState = { 
    username: '',
}

// *** ACTION TYPES *** //

const UPDATE_USERNAME = 'UPDATE_USERNAME';
const UPDATE_NAV = 'UPDATE_NAV';
const UPDATE_NAV_FULFILLED = 'UPDATE_NAV_FULFILLED';
const CLEAR_STATE = 'CLEAR_STATE';

// *** REDUCER *** // 

export default function(state = initialState, action) {
    switch(action.type) {
        case UPDATE_USERNAME:
            return {...state, username: action.payload};
        case UPDATE_NAV_FULFILLED:
            return {...state, username: action.payload.username};
        case CLEAR_STATE:
            return {initialState};
        default:
            return state;
    }
}
 
// *** ACTION CREATORS *** //

export function updateUsername(username) {
    return {
        type: UPDATE_USERNAME,
        payload: username,
    }
};

export function updateNav() {
    return {
        type: UPDATE_NAV,
        action: axios.get('/auth/user')
    }
};

export function clearState() {
    return {
        type: CLEAR_STATE,
    }
}