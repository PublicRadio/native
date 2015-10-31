/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    Component,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

class PublicRadioNative extends Component {
    componentDidMount () {
        require('react-native').NativeModules.BackgroundPlayer.play()
    }
    render () {
        return <View style={styles.container}>
            <Text style={styles.welcome}>
                {Object.getOwnPropertyNames(require('react-native').NativeModules).join(', ')}
            </Text>
            <TouchableHighlight onPress={() => {}}>
                <Icon
                    name='pause'
                    size={30}
                    color='#333333'
                />
            </TouchableHighlight>
        </View>
    }
}

AppRegistry.registerComponent('PublicRadioNative', () => PublicRadioNative);
