import types from './types';
import axios from 'axios';

const url = 'https://piedpiper.briandhkim.fun/table/access.php';


export function getAllData(){
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