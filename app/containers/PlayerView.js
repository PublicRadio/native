import * as playerActions from '../redux/modules/player'
import {PlayPauseButton, NextTrackButton, LoginButton} from '../components/index'
import React, {Component, StyleSheet, View, NativeModules} from 'react-native'
import {connect} from 'react-redux/native'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeffee'
    }
})

export const PlayerView = connect(state => state.player, playerActions)
(class PlayerView extends Component {
    render() {
        const {name,screen_name,photo_200, id} = this.props
        return <View style={styles.container}>
            {/*<LoginButton onPress={() => NativeModules.VKInterface.login()}/>*/}

            <PlayPauseButton mode={this.props.mode} onPress={this.props.toggleButton}/>
            <NextTrackButton onPress={this.props.nextTrackButtonClick}/>
        </View>
    }
})