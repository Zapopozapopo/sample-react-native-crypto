import { combineReducers } from 'redux'
import {crypto} from './cryptoReducer'
import {coinDetails} from './coinDetailsReducer'
import {auth} from './auth'

export default combineReducers({
    crypto: crypto,
    details: coinDetails,
    auth: auth
})