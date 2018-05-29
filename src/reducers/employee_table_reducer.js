import types from '../actions/types';

const DEFAULT_STATE = {
	employeeData : null,	//empData from tablePage.js
	retrievingInProgress : false,
	addInProgress : false,
	addSuccess : false,
	addInProgress : false,
	deleteSuccess : false,
	deleteInProgress : false,
	searchInProgress: false,
	noResult : null,
	showModal : false,
	showErrorModal : false,
	errorMessage : ''
};

export default function(state = DEFAULT_STATE, action){	
	switch(action.type){
		case types.GET_ALL_DATA:
			let retrievingInProgress = true;
			let data = null;
			if(action.payload.data){
				retrievingInProgress = false;
				data = action.payload.data.data;
			}

			return {
				...state,
				employeeData : data,
				addInProgress : false,
				addSuccess : false,
				deleteInProgress : false,
				deleteSuccess : false,
				retrievingInProgress : retrievingInProgress,
				noResult : null
			}
		case types.RETRIEVING_DATA:
			return{
				...state,
				retrievingInProgress : true
			}
		case types.ADD_EMPLOYEE:
			// console.log(action.payload.data);
			const addingSuccess = action.payload.data.success;
			const errorMsgs = action.payload.data.errors;
			let addingProgress = true;
			//check against any payload data to check if request finished
			if(action.payload.data){
				addingProgress = false;
			}
			if(!addingSuccess){
				return{
					...state,
					addInProgress : false,
					showErrorModal : true,
					errorMessage : errorMsgs[0]
				}
			}

			return{
				...state,
				addInProgress : addingProgress,
				addSuccess : addingSuccess,
				errorMessage : ''
			}
		case types.DELETE_EMPLOYEE:
			// console.log('payload data at delete employee', action.payload.data);
			const delSuccess = action.payload.data.success;
			const delErrorMsg = action.payload.data.errors;
			let delProgress = true;
			if(action.payload.data){
				delProgress = false;
			}
			if(!delSuccess){
				return{
					...state,
					deleteInProgress : false,
					showErrorModal : true,
					errorMessage : delErrorMsg
				}
			}
			return{
				...state,
				deleteInProgress : delProgress,
				deleteSuccess : delSuccess
			}
		case types.SEARCH_EMPLOYEE:
			// console.log('payload data at search employee', action.payload.data);
			const searchResult = action.payload.data;
			let searchInProgress = true;
			if(searchResult){
				searchInProgress = false;
			}

			if(searchResult.success){
				return{
					...state,
					searchInProgress: searchInProgress,
					noResult : false,
					employeeData : searchResult.data,
					showModal : false,
					errorMessage : ''
				}
			}else if(searchResult.success===false){
				return{
					...state,
					searchInProgress: searchInProgress,
					noResult : true,
					errorMessage : searchResult.errors[0]
				}
			}else{
				return{
					...state,
					searchInProgress : searchInProgress
				}
			}
		case types.SHOW_ERROR_MODAL:
			return{
				...state,
				showErrorModal : true
			}
		case types.SET_ERROR_MESSAGE:
			return{
				...state,
				errorMessage : action.payload
			}
		case types.SHOW_MODAL:
			return{
				...state,
				showModal: true
			}
		case types.HIDE_MODAL:
			return{
				...state,
				showModal : false,
				showErrorModal : false,
				noResult : null,
				errorMessage : ''
			}
		default:
			// console.log('state at reducer', state);
			return state;
	}
}