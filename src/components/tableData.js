import React from 'react';
import firebase from './firebase/firebase';
import {Button} from 'react-bootstrap';

const TableData = (props) =>{

	const {employee, refreshData} = props;
	const tableKey = Object.keys(employee)[0];
	const {first_name, last_name, id, phone, supervisor} = employee[tableKey];
	let firstN = first_name[0].toUpperCase() + first_name.slice(1,);
	let lastN = last_name[0].toUpperCase() + last_name.slice(1,);
	let phoneNum = phone+'';
	phoneNum = '('+phoneNum.slice(0,3)+') '+phoneNum.slice(3,6)+'-'+phoneNum.slice(6);
	const deleteEmp = ()=>{
		const empTable = firebase.database();
		const refKey = 'Employees/'+tableKey;
		empTable.ref(refKey).set(null).then(()=>{
			refreshData();
		});
	};

	return(
		<tr>
			<td>{lastN}, {firstN}</td>
			<td>{id}</td>
			<td>{supervisor}</td>
			<td>{phoneNum}</td>
			<td>
				<Button className='btn-danger' onClick={deleteEmp}>
					Delete
				</Button>
			</td>
		</tr>
	)
}

export default TableData;