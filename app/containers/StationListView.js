import React, { Component, ScrollView, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import Station from '../components/Station'
import * as navigatorActions from '../redux/modules/navigator'
import {vk} from '../lib/index'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
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
            {this.state.stations.map(opt => <Station key={opt.id} {...opt} play={id => this.props.openStation(id)}/>)}
        </ScrollView>;
    }
}
