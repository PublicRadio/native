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

export default class LoginButton extends Component {
    render() {
        const {mode, onPress} = this.props

        return <TouchableOpacity onPress={onPress}>
            <Icon
                name='accessibility'
                size={90}
                color='#333333'/>
        </TouchableOpacity>

    }
}