import * as playerActions from '../redux/modules/player';
import { PlayPauseButton, NextTrackButton, LoginButton } from '../components/index';
import { connect } from 'react-redux/native';
import {NativeModules} from 'react-native';

import React, {
    Component,
    StyleSheet,
    View,
    Text,

} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeffee'
    }
});

export default class PlayerView extends Component {
    render() {
        return <View style={styles.container}>
            <LoginButton onPress={() => NativeModules.VKInterface.login()}/>
            <PlayPauseButton mode={this.props.mode} onPress={this.props.toggleButton}/>
            <NextTrackButton onPress={this.props.nextTrackButtonClick}/>
        </View>
    }
}

export default connect(
    ({player})=> {
        return {mode: player.get('mode')};
    },
    {...playerActions}
)(PlayerView);