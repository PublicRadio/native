import Icon from 'react-native-vector-icons/MaterialIcons'
import {connect} from 'react-redux'


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


export default connect(store => store.vk)
(class LikeButton extends Component {
    render() {
        return <TouchableOpacity onPress={() => {
            this.authorised ? NativeModules.VKInterface.login() : undefined
        }}>
            <Icon
                name='favorite-border'
                size={30}
                color='#333333'/>
        </TouchableOpacity>

    }
})
