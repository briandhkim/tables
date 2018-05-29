import types from './types';
import axios from 'axios';
import qs from 'qs';

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

export function addEmployee(values){
	console.log('values at actions index', values);
	const {name, phone, supervisor} = values;
	const nameFilter = name.split(' ');
	let firstName = '';
	let lastName = '';
	if(nameFilter[0].includes(',')){
		lastName = nameFilter[0].replace(',','');
		firstName = nameFilter[1];
	}else{
		lastName = nameFilter[1];
		firstName = nameFilter[0];
	}
	const phoneFilter = phone.replace(/\D+/g,'');

	const data = {
		action 	: types.ADD_EMPLOYEE,
		first_name 		: 	firstName,
		last_name 		: 	lastName,
		phone_number 	: 	phoneFilter,
		supervisor		: 	supervisor
	};

	const request = axios.post(url,
		qs.stringify(data)
	);

	return{
		type: types.ADD_EMPLOYEE,
		payload: request
	}
}