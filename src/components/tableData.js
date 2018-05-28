import React from 'react';
// import firebase from './firebase/firebase';
import axios from 'axios';
import qs from 'qs';
import {Button} from 'react-bootstrap';

const TableData = (props) =>{

	const {employee, refreshData} = props;

	let {employee_id, first_name, last_name, phone_number, supervisor} = employee;

	// const tableKey = Object.keys(employee)[0];
	// const {first_name, last_name, id, phone, supervisor} = employee[tableKey];
	first_name = first_name[0].toUpperCase() + first_name.slice(1,);
	last_name = last_name[0].toUpperCase() + last_name.slice(1,);
	phone_number = '('+phone_number.slice(0,3)+') '+phone_number.slice(3,6)+'-'+phone_number.slice(6);
	if(employee_id.length <= 1){
		employee_id = `00${employee_id}`;
	}else if(employee_id.length <= 2){
		employee_id = `0${employee_id}`;
	}

	const deleteEmp = ()=>{
		const data = {
			action		: 	'delete_by_id',
			employee_id	: 	employee_id
		}
		axios.delete('https://piedpiper.briandhkim.fun/table/access.php',{
			data: qs.stringify(data)
		})
		.then((res)=>{
			console.log(res);
		}).catch((err)=>{
			console.log(err);
		});;


	};

	return(
		<tr>
			<td>{last_name}, {first_name}</td>
			<td>{employee_id}</td>
			<td>{supervisor}</td>
			<td>{phone_number}</td>
			<td>
				<Button className='btn-danger' onClick={deleteEmp}>
					Delete
				</Button>
			</td>
		</tr>
	)
}

export default TableData;