import types from '../actions/types';

const DEFAULT_STATE = {
	employeeData : null,	//empData from tablePage.js
	addInProgress : false,
	searchInProgress: false
};

export default function(state = DEFAULT_STATE, action){
	switch(action.type){
		case types.GET_ALL_DATA:
			console.log('get all data at reducer', action.payload.data);
			return {
				employeeData : action.payload.data
			}
		default:
			return state;
	}
}