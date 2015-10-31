import { createAction } from 'redux-actions';
import { handleActions } from 'redux-actions'
import Immutable from 'immutable';
import {NativeModules} from 'react-native';
const {BackgroundPlayer} = NativeModules;

export const toggleButton = () => (
  (dispatch, getState) => {
    const {player} = getState()
    const mode = player.get('mode');

    let newMode;
    if(mode === 'paused') {
      BackgroundPlayer.play()  
      newMode = 'playing';
    } else {
      BackgroundPlayer.pause()  
      newMode = 'paused';
    }
  
    dispatch(createAction('SET_PLAYER_STATE')({mode: newMode}));
  }
)

export default handleActions({
    'SET_PLAYER_STATE': (state, {payload:{mode}})=> state.set('mode', mode)
  }, 
  Immutable.fromJS({mode: 'paused'})
)