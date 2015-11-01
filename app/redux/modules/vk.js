import { createAction, handleActions } from 'redux-actions'
import {NativeModules} from 'react-native'

const {BackgroundPlayer} = NativeModules

export const authorize = (authorized) => createAction('VK_STATECHANGE')({authorized})


export default handleActions({
        'VK_STATECHANGE': (state, {payload:{authorized}})=> ({...state, authorized})
    },
    {authorized: false})