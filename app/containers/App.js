/* @flow weak */
/*eslint-disable */

import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';
import createApiClientStore from '../redux/create';
import PlayerView from './PlayerView'
import { DeviceEventEmitter } from 'react-native';
import { createAction } from 'redux-actions';
import * as nativeActions from '../actions/nativeActions';

const store = createApiClientStore(null);

DeviceEventEmitter.addListener('ReduxAction', (e: Event) =>{
  store.dispatch(nativeActions[e.actionName](e.payload))
});

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <PlayerView />}
      </Provider>
    );
  }
}