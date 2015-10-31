import Icon from 'react-native-vector-icons/MaterialIcons'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native'

const styles = StyleSheet.create({
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
    }
});

export default class PlayPauseButton extends Component {
    render() {   
        const iconName = (this.props.mode === 'paused' || this.props.mode === 'stopped') ? 'play-arrow' : 'pause' ;

        return <View style={styles.container}>
            <TouchableHighlight onPress={this.props.onPress}>
                <Icon
                    name={iconName}
                    size={30}
                    color='#333333'
                />
            </TouchableHighlight>
        </View>
    }
}