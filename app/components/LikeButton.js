import Icon from 'react-native-vector-icons/MaterialIcons'
import {vk} from '../lib/index'

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

export default class LikeButton extends Component {
    render() {
        return <TouchableOpacity onPress={this.props.onPress}>
            <Icon
                name={this.props.liked ? 'favorite' : 'favorite-border'}
                size={30}
                color='#333333'/>
        </TouchableOpacity>

    }
}
