import * as playerActions from '../redux/modules/player';
import PlayPauseButton from '../components/PlayPauseButton';
import { connect } from 'react-redux/native';

export default connect(
  ({player})=>{
    return {mode: player.get('mode')};
  },
  {onPress: playerActions.toggleButton}
)(PlayPauseButton);