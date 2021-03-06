import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getAllData, addEmployee, openModal, openErroModal, setErrorMessage} from '../actions';
import {Glyphicon, OverlayTrigger, Button, Popover} from 'react-bootstrap';
import $ from 'jquery';

class FormAndButtons extends Component{
	constructor(props){
		super(props);
		this.downloadCSV = this.downloadCSV.bind(this);
	}

	componentDidUpdate(){
		const {reset, addSuccess, getAllData, errorMessage} = this.props;
		if(addSuccess){
			reset();
			getAllData();
		}
		if(errorMessage.length){
			reset();
		}
	}

	downloadCSV(){
		const {employeeData} = this.props;

		function csvOutput(data){
			let csvContent = "data:text/csv;charset=utf-8,First Name,Last Name,ID,Phone,Supervisor\n";

			data.map((employee, idx)=>{
				let {employee_id, first_name, last_name, phone_number, supervisor } = employee;
				first_name = first_name[0].toUpperCase() + first_name.slice(1,);
				last_name = last_name[0].toUpperCase() + last_name.slice(1,);
				phone_number = '('+phone_number.slice(0,3)+') '+phone_number.slice(3,6)+'-'+phone_number.slice(6);
				
				csvContent += `${first_name}, ${last_name}, ${employee_id}, ${phone_number}, ${supervisor} \n`;
			});
			return encodeURI(csvContent);
		}

		const encoded = csvOutput(employeeData);

		let linkElmt = $('<a>',{
			class: 'csvLink',
			href: encoded,
			download: "employee_data.csv"
		}).appendTo('body');
		$('.csvLink')[0].click();
		$('.csvLink').remove();
	}

	renderInput( {input, label, type, placeholder, meta:{touched, error}} ){
		let glyphClass = '';
		if(label==='Name'){
			glyphClass = 'user';
		}else if(label==='Phone Number'){
			glyphClass = 'earphone';
		}else if(label==='Supervisor'){
			glyphClass = 'king';
		}
		return(
			<div>
				<div className='input-group form-group'>
					<span className='input-group-addon'>
						<Glyphicon glyph={glyphClass} />
					</span>
					<input {...input} type={type} placeholder={placeholder} className='form-control' />
					
				</div>
				<p className="text-danger">{touched && error}</p>
			</div>
		)
	}

	submitEmployee(values){
		const{name, phone, supervisor} = values;
		if(!name || !phone || !supervisor){
			this.props.setErrorMessage('Fill in all fields')
		}else{
			this.props.addEmployee(values);
		}
	}

	render(){
		const {handleSubmit, addInProgress, retrievingInProgress, openModal, getAllData, errorMessage} = this.props;
		const csvPopover = (
			<Popover id="popover-trigger-hover-focus">
				download as CSV
			</Popover>
		);

		return(
			<div className='form-horizontal col-sm-12 col-md-2 col-md-push-9 addForm'>
				<h4><strong>Add Employee</strong></h4>
				<form  onSubmit={ handleSubmit( (val)=>{this.submitEmployee(val)} ) } >
					<Field name='name' component={this.renderInput} type='text' placeholder='Employee Name' label='Name' />
					<Field name='phone' component={this.renderInput} type='text' placeholder='Employee Phone' label='Phone Number' />
					<Field name='supervisor' component={this.renderInput} type='text' placeholder='Supervisor' label='Supervisor' />

					<p className={`text-danger ${errorMessage ? 'show' : 'hidden'}`}>
						{errorMessage}
					</p>
					<Button className='btn-success btn-block empAddBtn'onClick={handleSubmit( (val)=>{this.submitEmployee(val)} )}>
						<span className={`${addInProgress ? 'show' : 'hidden'}`} disabled={`${addInProgress ? 'disabled' : ''}`}>
							Adding... <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
						</span>
						<span className={`${addInProgress ? 'hidden' : 'show'}`}>
							Add <i className="fa fa-pied-piper" aria-hidden="true"></i>
						</span>
					</Button>
					<Button className='btn-primary btn-block' onClick={getAllData}>
						<span className={`${retrievingInProgress ? 'show' : 'hidden'}`} disabled={`${retrievingInProgress ? 'disabled' : ''}`}>
							Loading... <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
						</span>
						<span className={`${retrievingInProgress ? 'hidden' : 'show'}`}>
							Load All
						</span>
					</Button>
					<Button className='btn-info btn-block' onClick={openModal}>
						Search
					</Button>
					<OverlayTrigger trigger={['hover','focus']} placement="left" overlay={csvPopover}>
						<Button className='label-default pull-right csvBtn' onClick={this.downloadCSV}>
							<Glyphicon glyph='download-alt' />
						</Button>
					</OverlayTrigger>
				</form>
			</div>
		)
		
	}

}

function mapStateToProps(state){
	const table = state.table;
	return{
		addInProgress : table.addInProgress,
		addSuccess : table.addSuccess,
		employeeData : table.employeeData,
		retrievingInProgress : table.retrievingInProgress,
		errorMessage : table.errorMessage
	}
}

function validation(values){
	const error = {};
	if(!values.name){
		error.name = 'enter a name'
	}
	if(!values.phone){
		error.phone = 'enter a phone number'
	}
	if(!values.supervisor){
		error.supervisor = 'enter supervisor name'
	}
	return error;
}

FormAndButtons = reduxForm({
	form: 'add-employee',
	validate: validation
})(FormAndButtons);

export default connect(mapStateToProps, {getAllData, addEmployee, openModal, openErroModal, setErrorMessage})(FormAndButtons);
