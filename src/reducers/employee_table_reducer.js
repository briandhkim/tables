import types from '../actions/types';

const DEFAULT_STATE = {
	employeeData : null,	//empData from tablePage.js
	addInProgress : false,
	addSuccess : false,
	addInProgress : false,
	searchInProgress: false
};

export default function(state = DEFAULT_STATE, action){
	switch(action.type){
		case types.GET_ALL_DATA:
			return {
				...state,
				employeeData : action.payload.data,
				addInProgress : false
			}
		case types.ADD_EMPLOYEE:
			console.log(action.payload.data);
			const {success} = action.payload.data;
			let addingProgress = true;
			if(action.payload.data){
				addingProgress = false;
			}

			return{
				...state,
				addInProgress : addingProgress,
				addSuccess : success
			}
		default:
			console.log('state at reducer', state);
			return state;
	}
}