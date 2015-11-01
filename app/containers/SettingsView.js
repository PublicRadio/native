import React, { Component, ScrollView, StyleSheet } from 'react-native'
import {vk} from '../lib/index'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    }
});

export class SettingsView extends Component {
    constructor(...args) {
        super(...args)
        this.state = {user: null}
        vk.getUserInfo(0, ['photo_200'])
            .then(user => this.setState({user}))
    }

    render() {
        return <ScrollView contentContainerStyle={styles.container}>

        </ScrollView>;
    }
}
