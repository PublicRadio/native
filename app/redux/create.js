/* @flow weak */

import {createStore, applyMiddleware, compose} from 'redux';
import createLogger from 'redux-logger';
import reducer from './modules/reducer';
import {Iterable} from 'immutable';
import * as nativeActions from '../actions/nativeActions';
import {vk} from '../lib/index'
import {DeviceEventEmitter} from 'react-native';
import thunkMiddleware from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import apiMiddleware from './middleware/apiMiddleware';

const finalCreateStore = compose(
    applyMiddleware(apiMiddleware, thunkMiddleware, promiseMiddleware)
)(createStore);

export const store = finalCreateStore(reducer);

DeviceEventEmitter.addListener('ReduxAction', (e:Event) => {
    console.log(e.actionName);
    if(!nativeActions[e.actionName]) {
      return;
    }
    
    store.dispatch(nativeActions[e.actionName](e.payload));
});

store.dispatch(require('./modules/vk').authorize(false))
store.dispatch(require('./modules/loader').init())
