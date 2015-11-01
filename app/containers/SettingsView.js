import React, { Component, ScrollView, View, StyleSheet, Text } from 'react-native'
import {vk} from '../lib/index'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export class SettingsView extends Component {
    constructor(...args) {
        super(...args)
        this.state = {user: null}
        vk.call('users.get', {fields: 'photo_200'})
            .then(users => this.setState({user: users[0]}))
    }

    render() {
        return <ScrollView contentContainerStyle={styles.container}>
            <Text>
                Страница настроек
            </Text>
            {this.state.user
                ? <View>
                <Text>Вы авторизованы как {this.state.user.first_name} {this.state.user.last_name}</Text>
                <Text>Выйти?</Text>
            </View>
                : false}

        </ScrollView>;
    }
}
