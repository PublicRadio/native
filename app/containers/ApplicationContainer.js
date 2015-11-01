import React, {Component} from 'react-native'
import {StationListView} from './StationListView'
import {PlayerView} from './PlayerView'
import {connect} from 'react-redux/native'

export const ApplicationContainer = connect(store => store.navigator)
(class ApplicationContainer extends Component {
    render() {
        switch (this.props.page) {
            case 'station':
                return <PlayerView {...this.props.opts}/>
            default:
                return <StationListView opts={this.props.opts}/>
        }
    }
})