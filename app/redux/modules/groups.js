
const subscribe = (item, isSubscribe) => 
  item.subscribe = isSubscribe;
  return item;

const applyFuncToItem = (func)=>(item)=>
  return func(item);

export default handleActions({
   'SUBSCRIBE_GROUP' : (state, {id}}) => ,
   'SET_GROUPS' : (state, payload) => ,
   'CLEAR_GROUPS' : (state) => ({}),
}, {})