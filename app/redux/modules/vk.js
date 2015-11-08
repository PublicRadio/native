import { createAction, handleActions } from 'redux-actions'
import {NativeModules} from 'react-native'
import {vk} from '../../lib/index'

const {BackgroundPlayer} = NativeModules

export const authorize = (authorized) => dispatcher => {
    dispatcher(createAction('VK_STATE_CHANGE')({authorized}));

    (authorized
        ? vk.getFavorites()
        : vk.getPopular())
        .then(ids => Promise.all(ids.slice(0, 50)
            .map(id => vk.getGroupInfo(id, ['photo_200']))))
        .then(stations =>
            stations.filter(({name}) =>
            name.trim().toLowerCase() !== 'музыка' &&
            name.toLowerCase().indexOf('клуб') === -1))
        .then(stations => dispatcher(createAction('VK_STATIONS_CHANGE')(stations)))
        .catch(e => console.error(e, 'stack err'))
}

export default handleActions({
        'VK_STATE_CHANGE': (state, {payload:{authorized}}) => ({...state, authorized, stations: []}),
        'VK_STATIONS_CHANGE': (state, {payload:stations}) => ({...state, stations})
    },
    {authorized: false, stations: []})
