import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {hideModal, searchEmployee, setErrorMessage} from '../actions';
import {FormGroup, Glyphicon, FormControl, Button} from 'react-bootstrap';

class SearchModal extends Component{

	searchEmployee(values){
		// console.log(values);
		if(!values.firstName && !values.lastName && !values.employeeID){
			this.props.setErrorMessage('Fill in at least one area');
		}else{
			this.props.searchEmployee(values);
		}
	}

	renderInput( {input, label, type, placeholder, meta:{touched, error}} ){
		return(
			<div>
				<div className='input-group form-group'>
					<span className='input-group-addon'>
						<Glyphicon glyph='pencil' />
					</span>
					<input {...input} type={type} placeholder={placeholder} className='form-control' />
				</div>
				<p className="text-danger small">{touched && error}</p>
			</div>
		)
	}

	render(){

		const {handleSubmit, hideModal, noResult, searchInProgress, errorMessage } = this.props;
		return(
			<div className='form-horizontal'>
				<form onSubmit={ handleSubmit( (val)=>{this.searchEmployee(val)} ) }>
					<Field name='firstName' component={this.renderInput} type='text' placeholder='Search by first name' label='First Name' />
					<Field name='lastName' component={this.renderInput} type='text' placeholder='Search by last name' label='Last Name' />
					<Field name='employeeID' component={this.renderInput} type='text' placeholder='Search by employee ID' label='ID' />
					

					<Button className='btn-block btn-info' onClick={ handleSubmit( (val)=>{this.searchEmployee(val)} ) }>
						<span className={`${searchInProgress ? '' : 'hidden'}`} >
							Searching... <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
						</span>
						<span className={`${searchInProgress ? 'hidden' : ''}`}>
							Search <i className="fa fa-pied-piper" aria-hidden="true"></i>
						</span>
					</Button>
					<span className={`text-danger ${errorMessage ? '' : 'hidden'}`}>
						<h4>
							{errorMessage ? errorMessage : 'No results found'}
						</h4>
					</span>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state){
	const table = state.table;
	return{
		searchInProgress : table.searchInProgress,
		noResult : table.noResult,
		errorMessage : table.errorMessage
	}
}


SearchModal = reduxForm({
	form : 'search-employee'
})(SearchModal);

export default connect(mapStateToProps, {hideModal, searchEmployee, setErrorMessage} )(SearchModal); 