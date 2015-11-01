import React, {Component} from 'react-native'
import {Provider} from 'react-redux/native'
import {store} from '../redux/create'

import {ApplicationContainer} from './ApplicationContainer'

export class App extends Component {
    render() {
        return <Provider store={store}>
            {() => <ApplicationContainer/>}
        </Provider>;
    }
}