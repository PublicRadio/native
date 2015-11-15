import { createAction } from 'redux-actions';
import {vk} from '../lib/index'

export const playerTrackChange = (obj)=> createAction('playerTrackChange')(obj);

export const AccessTokenUpdate = ({token})=> {
	vk.sid = token
    store.dispatch(require('./modules/vk').authorize(!!vk.sid))
}