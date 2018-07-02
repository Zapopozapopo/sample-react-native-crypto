import axios from 'axios'
import {apiBaseURL} from '../utils/Constants'

export const FETCHING_COIN_DATA_DETAILS = 'FETCHING_COIN_DATA_DETAILS';
export const FETCHING_COIN_DATA_DETAILS_SUCCESS = 'FETCHING_COIN_DATA_DETAILS_SUCCESS';
export const FETCHING_COIN_DATA_DETAILS_FAIL = 'FETCHING_COIN_DATA_DETAILS_FAIL';

const initialState = {
    isFetching: null,
    data: {},
    HasError: false,
    ErrorMessage: null,
};

export function coinDetails(state = initialState, action) {
    switch (action.type) {
        case FETCHING_COIN_DATA_DETAILS:
            return Object.assign({}, state, {
                isFetching: true,
                data: {},
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload[0],
                hasError: false,
                errorMessage: null
            });
        case FETCHING_COIN_DATA_DETAILS_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload[0],
                hasError: true,
                errorMessage: action.err
            });

        default:
            return state;
    }
}

export default function FetchCoinDataDetails(id) {
    return dispatch => {
        dispatch({type: FETCHING_COIN_DATA_DETAILS});

        return axios.get(`${apiBaseURL}/v1/ticker/${id}`)
            .then(res => {
                dispatch({type: FETCHING_COIN_DATA_DETAILS_SUCCESS, payload: res.data})
            })
            .catch(err => {
                dispatch({type: FETCHING_COIN_DATA_DETAILS_FAIL, payload: err.data})
            })
    }
}