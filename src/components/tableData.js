import React, {Component} from 'react';
import {connect} from 'react-redux';
import { getAllData, deleteEmployee, retrievingData } from '../actions';
// import axios from 'axios';
// import qs from 'qs';
import {Button} from 'react-bootstrap';

class TableData extends Component{
	constructor(props){
		super(props);
		this.deleteEmp = this.deleteEmp.bind(this);
	}

	
	componentDidUpdate(){
		const {deleteSuccess, getAllData, retrievingInProgress, retrievingData} = this.props;
		if(deleteSuccess && !retrievingInProgress){
			retrievingData();
			getAllData();
		}
	}

	formatData(data){
		let {employee_id, first_name, last_name, phone_number, supervisor} = data;
		first_name = first_name[0].toUpperCase() + first_name.slice(1,);
		last_name = last_name[0].toUpperCase() + last_name.slice(1,);
		phone_number = '('+phone_number.slice(0,3)+') '+phone_number.slice(3,6)+'-'+phone_number.slice(6);
		if(employee_id.length <= 1){
			employee_id = `00${employee_id}`;
		}else if(employee_id.length <= 2){
			employee_id = `0${employee_id}`;
		}
		return {first_name, last_name, phone_number, employee_id, supervisor};
	}

	deleteEmp(){
		const {employee, deleteEmployee} = this.props;
		const {employee_id} = employee;
		deleteEmployee(employee_id);
	}

	render(){

		const {employee, deleteEmployee} = this.props;

		const employeeStringFormat = this.formatData(employee);
		const {employee_id, first_name, last_name, phone_number, supervisor} = employeeStringFormat;

		return(
			<tr>
				<td>{last_name}, {first_name}</td>
				<td>{employee_id}</td>
				<td>{supervisor}</td>
				<td>{phone_number}</td>
				<td>
					<Button className='btn-danger' onClick={this.deleteEmp}>
						Delete
					</Button>
				</td>
			</tr>
		)
	}
}

function mapStateToProps(state){
	const table = state.table;
	return{
		deleteInProgress : table.deleteInProgress,
		deleteSuccess : table.deleteSuccess,
		retrievingInProgress : table.retrievingInProgress
	}
}

// export default TableData;
export default connect( mapStateToProps, {getAllData, deleteEmployee, retrievingData} )(TableData);