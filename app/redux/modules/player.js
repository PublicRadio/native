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
    } else if(mode === 'stopped') {
        BackgroundPlayer.setTrackList([
            {artist: "Swervedriver", title: "99th dream", uri: "https://psv4.vk.me/c1814/u602240/audios/3c1285bc0568.mp3?extra=lFM15JAWy028kJhacDc9g3hewp6cyScRXnaMDoSXQ4JFalIc6ehimXvykXUNIRe5VkfVNeZZbbRlFkGc2cd-e32ygjorxMQ"},
            {artist: "Papa Roach", title: "The World Around You (The Paramour Sessions)", uri: "https://cs1-37v4.vk-cdn.net/p9/cea92d23d89fe2.mp3?extra=H7-AMY7mfBo4h1Z3kDGHwCvjuTKx-H1HBNXMqvn2B5km8kRwufqmRlk2ymxb_tVZwuwglFswTYIG5AaQXlJ2_y670KpY3Ac"}
        ]);
        
        BackgroundPlayer.setNextTrack();
        BackgroundPlayer.play()  

        dispatch(createAction('SET_PLAYER_STATE')({mode: 'playing'}));
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
  Immutable.fromJS({mode: 'stopped'})
)