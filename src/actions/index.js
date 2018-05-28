import types from './types';
import axios from 'axios';

const url = 'https://piedpiper.briandhkim.fun/table/access.php';

function getAllDataSuccess(res){
	return{
		type: 'GET_ALL_DATA_SUCCESS',
		payload: res
	}
}
function getAllDataError(err){
	return{
		type: 'GET_ALL_DATA_ERROR',
		payload: err
	}
}

export function getAllData(){
	// return function(dispatch){
	// 	.then((res)=>{
	// 		dispatch(getAllDataSuccess(res));
	// 	}).catch((err)=>{
	// 		dispatch(getAllDataError(err));
	// 	});
	// }

	const request = axios({
						url: `${url}?action=${types.GET_ALL_DATA}`,
						method: 'GET'	
					});

	return{
		type: types.GET_ALL_DATA,
		payload: request
	}
}

export function addEmployee(){

	return{
		type: types.ADD_EMPLOYEE
	}
}