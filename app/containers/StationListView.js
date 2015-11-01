import React, { NativeModules, Component, ScrollView, StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'
import Station from '../components/Station'
import {vk} from '../lib/index'

const styles = StyleSheet.create({
    scroller: {
        height: Dimensions.get('window').height
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    },
    settingsButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        paddingTop: 8 + 32,
        paddingBottom: 8 + 32,
        paddingLeft: 8,
        paddingRight: 8,
        backgroundColor: 'black',
        transform: [

            {
                translateX: -8
            },
            {
                translateY: -32 - 8
            },
            {
                rotate: '45deg'
            }
        ]
    }
});

export const StationListView = connect(store => store.vk)
(class StationListView extends Component {
    constructor(...args) {
        super(...args)
        this.state = {stations: []}
    }

    componentDidMount() {
        vk.getPopular()
            .then(ids => Promise
                .all(ids.slice(0, 50)
                    .map(id =>
                        vk.getGroupInfo(id, ['photo_200']))))
            .then(stations => stations.filter(({name}) =>
            name.trim().toLowerCase() !== 'музыка' &&
            name.toLowerCase().indexOf('клуб') === -1))
            .then(stations => this.setState({stations}))
            .catch(e => console.log(e))
    }

    render() {
        //return <ScrollView contentContainerStyle={styles.container}>
        //    {this.state.stations.map(opt => <Station key={opt.id} {...opt}
        //                                             play={id => this.props.openStation(id)}/>)}
        //</ScrollView>
        return <View>
            <ScrollView style={styles.scroller} contentContainerStyle={styles.container}>
                {
                    this.props.authorized
                        ? false
                        : <View style={{backgroundColor: 'white'}}>
                        <Text style={{textAlign: 'center'}}>
                            Авторизуйтесь, чтобы иметь возможность добавлять аудиозаписи в избранное и получать персональные рекомендации
                        </Text>
                        <TouchableOpacity onPress={() => NativeModules.VKInterface.login()}
                                          style={{width: Dimensions.get('window').width}}>
                            <Text style={{textAlign: 'center', color: 'black', backgroundColor: '#ccc'}}>Войти</Text>
                        </TouchableOpacity>
                    </View>
                }
                {this.state.stations.map(opt => <Station key={opt.id} {...opt}
                                                         play={id => this.props.openStation(id)}/>)}
            </ScrollView>
            {
                this.props.authorized
                    ? <TouchableOpacity onPress={this.props.openSettings} style={styles.settingsButton}>
                        <Icon
                            name='settings'
                            size={32}
                            color='white'/>
                    </TouchableOpacity>
                    : false
            }
        </View>
    }
})
