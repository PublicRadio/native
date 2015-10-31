/* @flow weak */
/*eslint-disable */

import React, { Component } from 'react-native';
import { Provider } from 'react-redux/native';
import createApiClientStore from '../redux/create';
import PlayPauseButton from './PlayPauseButton'

const store = createApiClientStore(null);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        {() => <PlayPauseButton />}
      </Provider>
    );
  }
}