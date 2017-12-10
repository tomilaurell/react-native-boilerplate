/**
 * Create the store with dynamic reducers
 */

import {applyMiddleware, compose, createStore} from 'redux';
import {AsyncStorage} from 'react-native';
import {autoRehydrate, persistStore} from 'redux-persist-immutable'
import createActionBuffer from 'redux-action-buffer'
import {REHYDRATE} from 'redux-persist/constants'
import {fromJS} from 'immutable';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    let middlewares = [
        sagaMiddleware,
        createActionBuffer(REHYDRATE),
    ];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(logger);
    }

    const enhancers = [
        applyMiddleware(...middlewares),
        autoRehydrate()
    ]

    // If Redux DevTools Extension is installed use it, otherwise use Redux compose
    /* eslint-disable no-underscore-dangle */
    const composeEnhancers =
        process.env.NODE_ENV !== 'production' &&
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
                // Prevent recomputing reducers for `replaceReducer`
                shouldHotReload: false,
            })
            : compose;
    /* eslint-enable */

    const store = createStore(
        createReducer(),
        fromJS(initialState),
        composeEnhancers(...enhancers)
    )

    //initialize redux-persist-immutable
    persistStore(store, {storage: AsyncStorage})

    // Extensions
    store.runSaga = sagaMiddleware.run;
    store.injectedReducers = {}; // Reducer registry
    store.injectedSagas = {}; // Saga registry

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
