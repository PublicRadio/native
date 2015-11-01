import React, { Component, ScrollView, StyleSheet } from 'react-native'
import {connect} from 'react-redux'
import Station from '../components/Station'
import * as navigatorActions from '../redux/modules/navigator'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    }
});

export const StationListView = connect(state => state.player, navigatorActions)
(class StationListView extends Component {
    render() {
//todo
        return <ScrollView contentContainerStyle={styles.container}>
            {this.props.opts.map(opt => <Station key={opt.id} {...opt} play={id => this.props.goto('station', id)}/>)}
        </ScrollView>;
    }
})
