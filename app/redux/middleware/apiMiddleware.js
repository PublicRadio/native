// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'Call API';

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  if (!action) {
    return next(action);
  }

  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, promise, rest } = callAPI;

  if (!promise) {
    return next(action);
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  const [REQUEST, SUCCESS, FAILURE] = types;
  next({...rest, type: REQUEST});
  return promise().then(
    (result) => next({...rest, result, type: SUCCESS}),
    (error) => next({...rest, error, type: FAILURE})
  );
};


/// To use this middleware pass object 
// import createLoadableResource from './loadable' 
// import {CALL_API_FETCH} from '../middleware/apiFetchMiddleware' 

// const resourceName = 'page';

// const {isLoaded:_isLoaded, reducer, actions} = createLoadableResource(resourceName);

// export default reducer;
// export const isLoaded = _isLoaded;

// /**
//  * Load available spaces for this user
//  */
// export function load({userId, pageId}) {
//   return {
//     [CALL_API]:
//     {
//       types: actions,
//       promise: <SOME PROMISE>
//   }
//   }
// }