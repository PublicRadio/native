/* @flow weak */

import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import reducer from './modules/reducer';
import Immutable from 'immutable';

const loggerMiddleware = createLogger({
  transformer: (state) => {
    var newState = {};
    for (var i of Object.keys(state)) {
      if (Immutable.Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    };
    return newState;
  },
  actionTransformer: (action) => 
  {
    if(action && action.error && action.error.stack){
      return action.error.stack;
    }
    return action;
  }
});

export default function createApiClientStore(client) {
  // const middleware = clientMiddleware(client);

  const finalCreateStore = compose(
    applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware)
  )(createStore);
  
  return finalCreateStore(reducer);
}