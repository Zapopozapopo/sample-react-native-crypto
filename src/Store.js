import {createStore, applyMiddleware, compose} from 'redux'
import promise from 'redux-promise'
import thunk from 'redux-thunk'

import RootReducer from './reducers';

const middleware = applyMiddleware(thunk, promise);

const Store = createStore(
    RootReducer,
    compose(
        middleware,
        // DevTools config
        // devTools({
        //     name: Platform.OS,
        //     hostname: 'localhost',
        //     port: 5678
        // }),
    )
);

export default Store;
