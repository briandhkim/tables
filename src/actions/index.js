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

export function retrievingData(){
	return{
		type: types.RETRIEVING_DATA
	}
}

export function addEmployee(values){
	// console.log('values at actions index', values);
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

export function deleteEmployee(id){
	const data = {
		action 		: 	types.DELETE_EMPLOYEE,
		employee_id : 	id
	}

	const request = axios.delete(url,{
		data : qs.stringify(data)
	});

	return{
		type: types.DELETE_EMPLOYEE,
		payload: request
	}
}

export function searchEmployee(values){
	function searchByID(employeeID){
		const id = employeeID;
		return 	axios({
					url : `${url}?action=search_by_id&employee_id=${id}`,
					method : 'GET'
				});
	}

	function searchByName(firstName = '', lastName = ''){
		const firstN = firstName;
		const lastN = lastName;
		return	axios({
					url : `${url}?action=search_by_name&first_name=${firstN}&last_name=${lastN}`,
					method : 'GET'
				});
	}

	const {firstName, lastName, employeeID} = values;
	let request = null;
	if(employeeID && employeeID.length){
		request = searchByID(employeeID);
	}else if( (firstName&&firstName.length) || (lastName&&lastName.length) ){
		request = searchByName(firstName, lastName);
	}

	return{
		type: types.SEARCH_EMPLOYEE,
		payload: request
	}
}
export function openErrorModal(){
	return{type: types.SHOW_ERROR_MODAL}
}
export function setErrorMessage(msg){
	return{
		type: types.SET_ERROR_MESSAGE,
		payload: msg
	}
}
export function openModal(){
	return{type: types.SHOW_MODAL}
}
export function hideModal(){
	return{type: types.HIDE_MODAL}
}