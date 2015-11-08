import React, {Component, Navigator, BackAndroid} from 'react-native'
import {StationListView} from './StationListView'
import {PlayerView} from './PlayerView'
import {SettingsView} from './SettingsView'
import {connect} from 'react-redux/native'

export const ApplicationContainer =
(class ApplicationContainer extends Component {
    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => this.goBack());
    }

    render() {
        const {opts} = this.props;

        const renderScene = ({index, stationId, type}, navigator) => {
            this.goBack = () => index > 0 ? navigator.pop() || true : false
            
            switch (true) {
                case index === 0:
                    return <StationListView stations={opts}
                                            openSettings={() => navigator.push({index: index + 1, type: 'settings'})}
                                            openStation={stationId => navigator.push({index: index + 1, type: 'player', stationId})}/>
                case type === 'player':
                    return <PlayerView {...opts}
                                       station={stationId}
                                       onBack={() => {if (index > 0) { navigator.pop(); }}}/>
                case type === 'settings':
                    return <SettingsView {...opts}
                                         onBack={() => {if (index > 0) { navigator.pop(); }}}/>
                default:
                    console.error ('unknown page type', type)
            }
        }
        return <Navigator
            initialRoute={{name: 'Initial Scene', index: 0}}
            renderScene={renderScene}/>
    }
})