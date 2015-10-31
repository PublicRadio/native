/* @flow weak */
/*eslint-disable */

import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';
import createApiClientStore from '../redux/create';
import PlayerView from './PlayerView'
import { createAction } from 'redux-actions';

const store = createApiClientStore(null);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <PlayerView />}
      </Provider>
    );
  }
}