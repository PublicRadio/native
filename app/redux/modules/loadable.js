export default (resourceName)=>{
  const LOAD = resourceName + '/LOAD';
  const LOAD_SUCCESS = resourceName + '/LOAD_SUCCESS';
  const LOAD_FAIL = resourceName + '/LOAD_FAIL';

  const reducer = (
    state = {loaded: false}, 
    action = {}
  )=> {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          loading: true
        };
      case LOAD_SUCCESS:
        return {
          ...state,
          loading: false,
          loaded: true,
          data: action.result
        };
      case LOAD_FAIL:
        return {
          ...state,
          loading: false,
          loaded: false,
          error: action.error
        };
      default:
        return state;
    }
  }

  const isLoaded = (globalState) => {
    return globalState[resourceName] && globalState[resourceName].loaded;
  }

  return {
    isLoaded,
    reducer,
    actions:[
        LOAD,
        LOAD_SUCCESS,
        LOAD_FAIL,
    ]
  }
}


