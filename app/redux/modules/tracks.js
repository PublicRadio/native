import createLoadableResource from './loadable' 
import {CALL_API} from '../middleware/apiMiddleware' 

const resourceName = 'tracks';

const {isLoaded:_isLoaded, reducer, actions} = createLoadableResource(resourceName);

export default reducer;
export const isLoaded = _isLoaded;

/**
 * Load available spaces for this user
 */
export function load() {
  return {
    [CALL_API]:
    {
      types: actions,
      promise: () =>
	      fetch('https://api.vk.com/method/wall.get?domain=acoustic__music&v=5.25&count=500')
            .then(result => result.json())
            .then(({response}) => response.items
                .reduce((acc, {attachments = []}) =>
                    [...acc, ...attachments.map(({audio}) => audio).filter(a => a)], []))
            .then(tracks => tracks.map(({url, ...track}) => ({uri: url, ...track})))
            .catch(console.error.bind(console))
    }
  }
}