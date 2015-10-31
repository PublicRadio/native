/* @flow weak */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducer from './modules/reducer';
import {Iterable} from 'immutable';

const loggerMiddleware = createLogger({
    transformer: (state) =>
        Object.keys(state)
            .reduce((state, key) => ({
                ...state, [key]: Iterable.isIterable(state[key])
                    ? state[state[key]].toJS()
                    : state[state[key]]
            })),
    actionTransformer: (action) =>
        action && action.error && action.error.stack
            ? action.error.stack
            : action
});

export default function createApiClientStore(client) {
    // const middleware = clientMiddleware(client);

    const finalCreateStore = compose(
        applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware)
    )(createStore);

    return finalCreateStore(reducer);
}