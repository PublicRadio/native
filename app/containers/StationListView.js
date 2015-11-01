import React, { Component, ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {connect} from 'react-redux'
import Station from '../components/Station'
import * as navigatorActions from '../redux/modules/navigator'
import {vk} from '../lib/index'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    },
    settingsButton: {
        position: 'absolute',
        left: 0,
        top: 0,
        padding: 8
    }
});

export class StationListView extends Component {
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
        return <ScrollView contentContainerStyle={styles.container}>
            {this.state.stations.map(opt => <Station key={opt.id} {...opt}
                                                     play={id => this.props.openStation(id)}/>)}
        </ScrollView>
        return <View>
            <ScrollView contentContainerStyle={styles.container}>
                {this.state.stations.map(opt => <Station key={opt.id} {...opt}
                                                         play={id => this.props.openStation(id)}/>)}
            </ScrollView>
            <TouchableOpacity onPress={this.props.onPress} style={styles.settingsButton}>
                <Icon
                    name='settings'
                    size={32}
                    color='white'/>
            </TouchableOpacity>
        </View>;
    }
}
