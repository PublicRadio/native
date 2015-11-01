import { createAction, handleActions } from 'redux-actions'
import {NativeModules} from 'react-native'

const {BackgroundPlayer} = NativeModules

export const nextTrackButtonClick = () => (dispatch) => {
        BackgroundPlayer.stop()
        dispatch(createAction('SET_PLAYER_STATE')({mode: 'paused'}))
        BackgroundPlayer.setNextTrack()
        BackgroundPlayer.play()
        dispatch(createAction('SET_PLAYER_STATE')({mode: 'playing'}))
    }

export const toggleButton = () => (dispatch, getState) => {
        const {player} = getState()
        switch (player.mode) {
            case 'paused':
                BackgroundPlayer.play()
            dispatch(createAction('SET_PLAYER_STATE')({mode: 'playing'}))
                return
            case 'stopped':
                BackgroundPlayer.setNextTrack()
                BackgroundPlayer.play()

                dispatch(createAction('SET_PLAYER_STATE')({mode: 'playing'}))
                return
            default:
                BackgroundPlayer.pause()
                dispatch(createAction('SET_PLAYER_STATE')({mode: 'paused'}))
                return
        }
    }

export default handleActions({
        'SET_PLAYER_STATE': (state, {payload:{mode}})=> state.set('mode', mode),
        'TRACKS_LOADED': (state, {payload:{tracks}})=> {
            BackgroundPlayer.setTrackList(tracks)
            return state.set('tracks', tracks)
        }
    },
    {mode: 'stopped'})