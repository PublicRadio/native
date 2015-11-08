import Icon from 'react-native-vector-icons/MaterialIcons'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

export default class PlayPauseButton extends Component {
    render() {
        const {mode, onPress} = this.props
        const isPaused = mode === 'paused' || mode === 'stopped'
        const iconName = isPaused ? 'play-arrow' : 'pause'

        return <TouchableOpacity onPress={onPress}>
            <Icon
                name={iconName}
                size={30}
                color='#333333'/>
        </TouchableOpacity>

    }
}