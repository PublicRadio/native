/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

import React, {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

var PublicRadioNative = React.createClass({
    render: function () {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Button!
                </Text>
                <Icon
                    name='pause'
                    size={300}
                    color='#333333'
                />
                <TouchableHighlight onPress={() => {}}>
                    <Icon
                        name='pause'
                        size={30}
                        color='#333333'
                    />
                </TouchableHighlight>
            </View>
        );
    }
});

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

AppRegistry.registerComponent('PublicRadioNative', () => PublicRadioNative);
