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
        return <View style={styles.container}>
            <TouchableOpacity onPress={this.props.onPress}>
                <Icon
                    name='skip-next'
                    size={30}
                    color='#333333'
                />
            </TouchableOpacity>
       </View>    
    }
}