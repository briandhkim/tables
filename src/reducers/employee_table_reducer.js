import types from '../actions/types';

const DEFAULT_STATE = {
	employeeData : null,	//empData from tablePage.js
	retrievingInProgress : false,
	addInProgress : false,
	addSuccess : false,
	addInProgress : false,
	deleteSuccess : false,
	deleteInProgress : false,
	searchInProgress: false
};

export default function(state = DEFAULT_STATE, action){	
	switch(action.type){
		case types.GET_ALL_DATA:
			let retrievingInProgress = true;
			if(action.payload.data){
				retrievingInProgress = false;
			}
			
			return {
				...state,
				employeeData : action.payload.data,
				addInProgress : false,
				addSuccess : false,
				deleteInProgress : false,
				deleteSuccess : false,
				retrievingInProgress : retrievingInProgress
			}
		case types.RETRIEVING_DATA:
			return{
				...state,
				retrievingInProgress : true
			}
		case types.ADD_EMPLOYEE:
			// console.log(action.payload.data);
			const addingSuccess = action.payload.data.success;
			let addingProgress = true;
			//check against any payload data to check if request finished
			if(action.payload.data){
				addingProgress = false;
			}

			return{
				...state,
				addInProgress : addingProgress,
				addSuccess : addingSuccess
			}
		case types.DELETE_EMPLOYEE:
			console.log('payload data at delete employee', action.payload.data);
			const delSuccess = action.payload.data.success;
			let delProgress = true;
			if(action.payload.data){
				delProgress = false;
			}
			return{
				...state,
				deleteInProgress : delProgress,
				deleteSuccess : delSuccess
			}
		default:
			console.log('state at reducer', state);
			return state;
	}
}