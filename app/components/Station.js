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

import SquareView from 'react-native-square-view'



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
        bottom: 8,
        backgroundColor: 'red'
    }
});

export default class Station extends Component {
    render() {
        const {name,screen_name,photo_200, id, play} = this.props
        return <TouchableOpacity onPress={() => play(id)} style={styles.container}>
            <Image source={{uri: photo_200}} style={styles.image}/>
            <View style={styles.description}>
                <Text>{name} - {screen_name}</Text>
            </View>
        </TouchableOpacity>

    }
}