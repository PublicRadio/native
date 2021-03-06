import * as playerActions from '../redux/modules/player'
import {LikeButton, NextTrackButton, LoginButton, PlayPauseButton} from '../components/index'
import React, {Component, StyleSheet, View, Text, NativeModules, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux/native'
import {vk} from '../lib/index'

const {BackgroundPlayer} = NativeModules;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eeffee',
        position: 'relative'
    },
    background: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height
    },
    content: {
        position: 'absolute',
        backgroundColor: 'rgba(255,255,255,.7)',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentImage: {
        width: 200,
        height: 200
    },
    contentImageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentButtons: {
        flexDirection: 'row',
        width: Dimensions.get('window').width,
        justifyContent: 'space-around',
        padding: 16,
        alignItems: 'center',
    }
})

export const PlayerView = connect(state => state.player, playerActions)
(class PlayerView extends Component {
    constructor(...args) {
        super(...args)
        this.state = {};
    }

    componentDidMount(){
        vk.getGroupInfo(this.props.station, ['photo_200'])
            .then(info => setTimeout(() => this.setState(info), 0))

        vk.getGroupTrackList(this.props.station)
        .then((tracks)=>{
            BackgroundPlayer.setTrackList(tracks);
        })
    }

    render() {
        const {name = '', screen_name = '', photo_200 = '', id } = this.state
        if (id) {
            return <View style={styles.container}>
                <Image source={{uri: photo_200 }} style={styles.background}/>
                <View style={styles.contentImageContainer}>
                    <Image source={{uri: photo_200 }} style={styles.contentImage}/>
                </View>
                <View style={styles.content}>
                    <Text>{name}</Text>
                    <View style={styles.contentButtons}>
                        <PlayPauseButton mode={this.props.mode} onPress={this.props.toggleButton}/>
                        <NextTrackButton onPress={this.props.nextTrackButtonClick}/>
                    </View>
                </View>
            </View>
        } else {
            return false
        }
    }
})

// <LikeButton onPress={() => NativeModules.VKInterface.login()}/>