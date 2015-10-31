import { createAction } from 'redux-actions';

export const init = (dispatch) => {
    console.log('loading ', 'https://api.vk.com/method/wall.get?domain=acoustic__music&v=5.25')
    fetch('https://api.vk.com/method/wall.get?domain=acoustic__music&v=5.25')
        .then(result => result.json())
        .then(({response}) => response.items
            .reduce((acc, {attachments = []}) =>
                [...acc, ...attachments.map(({audio}) => audio).filter(a => a)], []))
        .then(tracks => tracks.map(({url, ...track}) => ({uri: url, ...track})))
        .then(tracks => dispatch(createAction('TRACKS_LOADED')({tracks})))
        .catch(console.error.bind(console))
}
