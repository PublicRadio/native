import React, {Component, Navigator, BackAndroid} from 'react-native'
import {StationListView} from './StationListView'
import {PlayerView} from './PlayerView'
import {connect} from 'react-redux/native'

export const ApplicationContainer = connect(store => store.navigator)
(class ApplicationContainer extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => this.goBack());
    }

    render() {
        return <Navigator
            initialRoute={{name: 'Initial Scene', index: 0}}
            renderScene={({index,stationId}, navigator) => {
            this.goBack = () => index > 0 ? navigator.pop() || true : false
            return index
            ? <PlayerView {...this.props.opts}
            station={stationId}
            onBack={() => {if (index > 0) { navigator.pop(); }}}/>
            : <StationListView
            stations={this.props.opts}
            openStation={stationId => navigator.push({index: index + 1, name: 'Player', stationId})
            }/>}
        }/>
    }
})