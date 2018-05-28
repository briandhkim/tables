import types from '../actions/types';

const DEFAULT_STATE = {
	employeeData : null	//empData from tablePage.js
};

export default function(state = DEFAULT_STATE, action){
	switch(action.type){
		case types.GET_ALL_DATA:
			console.log('get all data at reducer', action.payload);
			return {
				employeeData : action.payload.data
			}
		case types.GET_ALL_DATA_SUCCESS:
			console.log('get all data success at reducer', action.payload);
			return{
				employeeData : action.payload
			}
		case types.GET_ALL_DATA_ERROR:
			console.log('get all data error at reducer', action.payload);
			return{
				employeeData : action.payload
			}
		default:
			return state;
	}
}