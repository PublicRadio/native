import { createAction, handleActions } from 'redux-actions'
import {vk} from '../../lib/index'

function wrapActionCreator(fn) {
    let latestActionId = 0
    return (...args) => {
        const currentActionId = ++latestActionId
        const isCurrent = () => console.log(latestActionId, currentActionId) || latestActionId === currentActionId
        return (dispatch, getState) => fn(...args)(
            (...args) => isCurrent() && dispatch(...args),
            getState,
            isCurrent)
    }
}

const gotoAction = createAction('NAVIGATOR_GOTO')
export const goto = wrapActionCreator((pageType, pageData) => (dispatch) => {
    switch (pageType) {
        case "station":
            dispatch(gotoAction({page: 'station', opts: {}}))
            Promise.all([
                vk.getGroupInfo(pageData.id, ['photo_200']),
                vk.getGroupTrackList(pageData.id)
            ]).then(([groupInfo, groupTracks]) => {
                dispatch(gotoAction({page: 'station', opts: {...groupInfo, tracks: groupTracks}}))
                dispatch(createAction('TRACKS_LOADED')({tracks: groupTracks}))
            })

            break;
        default:
            dispatch(gotoAction({page: 'list', opts: []}))
            vk.getPopular()
                .then(ids =>
                    Promise.all(
                        ids.slice(0, 50)
                            .map(id =>
                                vk.getGroupInfo(id, ['photo_200']))))
                .then(opts =>
                    dispatch(gotoAction({page: 'list', opts})))
                .catch(e => console.log(e))
            break;
    }

})

export default handleActions({
    'NAVIGATOR_GOTO': (state, {payload: {page, opts}}) => ({...state, page, opts})
}, {
    page: 'list',
    opts: []
})