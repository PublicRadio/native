import { createAction } from 'redux-actions';
export const login = (obj)=> (dispatch)=>{
	NativeModules.VKInterface.login()
};

// export const openSettings = (navigator, obj) => (dispatch) => {
// 	navigator.push(obj)
// };

// export const openStation = (navigator, obj) => (dispatch) => {
// 	navigator.push({index: index + 1, type: 'player', stationId})
// };

// openSettings={() => )}
//                                             openStation={stationId => navigator.push({index: index + 1, type: 'player', stationId})}/>
