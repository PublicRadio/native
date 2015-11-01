import Icon from 'react-native-vector-icons/MaterialIcons'
import Dimensions from 'Dimensions'
import React, {
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Dimensions.get('window').width - 16,
        height: Dimensions.get('window').width - 16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: 8,
        flexDirection: 'column',
        position: 'relative'
    },
    image: {
        width: Dimensions.get('window').width - 16,
        height: Dimensions.get('window').width - 16
    },
    description: {
        position: 'absolute',
        bottom: 0,
        width: Dimensions.get('window').width - 16,
        backgroundColor: 'white',
        alignItems: 'center'
    }
});

export default class Station extends Component {
    render() {
        const {name, screen_name, photo_200, id, play} = this.props
        return <TouchableOpacity onPress={() => play(id)} style={[styles.container]}>
            <Image source={{uri: photo_200}} style={[styles.image]}/>
            <View style={styles.description}>
                <Text style={[{fontSize: 24, textAlign: 'center'}]}>{name} - {screen_name}</Text>
            </View>
        </TouchableOpacity>

    }
}