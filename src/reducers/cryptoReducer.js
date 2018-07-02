import axios from 'axios'
import {apiBaseURL} from '../utils/Constants'


export const FETCHING_COIN_DATA = 'FETCHING_COIN_DATA';
export const FETCHING_COIN_DATA_SUCCESS = 'FETCHING_COIN_DATA_SUCCESS';
export const FETCHING_COIN_DATA_FAIL = 'FETCHING_COIN_DATA_FAIL';

const initialState = {
    isFetching: null,
    data: [],
    hasError: false,
    errorMessage: null
};

export function crypto(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COIN_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                data: [],
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}

export default function FetchCoinData() {
    return dispatch => {
        dispatch({type: FETCHING_COIN_DATA});

        return axios.get(`${apiBaseURL}/v1/ticker/?limit=10`)
            .then(res => {
                dispatch({type: FETCHING_COIN_DATA_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: FETCHING_COIN_DATA_FAIL, payload: err.data})
            })
    }
}