import axios from 'axios'
import {AsyncStorage} from 'react-native'
let instance = axios.create({
    baseURL: 'http://192.168.0.103:3000/',
    headers: {
        'Content-type': 'application/json; charset=utf-8'
    }
});

export function setAuthHeader(token) {

    try {
        AsyncStorage.setItem('UserToken', token);
    } catch (error) {
        throw(error);
    }
    instance.defaults.headers.common['x-access-token'] = token;

}

export function deleteAuthToken() {
    instance = axios.create({
        baseURL: 'http://192.168.0.103:3000/',
        headers: {
            'Content-type': 'application/json; charset=utf-8'
        }
    });
    AsyncStorage.removeItem('UserToken');
}

export default instance