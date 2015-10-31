import * as playerActions from '../redux/modules/player';
import { PlayPauseButton, NextTrackButton } from '../components';
import { connect } from 'react-redux/native';

import React, {
    Component,
    StyleSheet,
    View
} from 'react-native'

const styles = StyleSheet.create({
    container: {
    	flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default class PlayerView extends Component {
    render() {   
        return <View style={styles.container}>
            <PlayPauseButton mode={this.props.mode} onPress={this.props.toggleButton}/>
            <NextTrackButton onPress={this.props.nextTrackButtonClick}/>
       </View>    
    }
}

export default connect(
  ({player})=>{
    return {mode: player.get('mode')};
  },
  {...playerActions}
)(PlayerView);