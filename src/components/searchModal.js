import React, {Component} from 'react';
import axios from 'axios';
import qs from 'qs';
import {FormGroup, Glyphicon, FormControl, Button} from 'react-bootstrap';

class SearchModal extends Component{
	constructor(props){
		super(props);
		this.state={
			firstName: '',
			lastName: '',
			empId: '',
			noResult: false
		}
		this.firstNameInput = this.firstNameInput.bind(this);
		this.lastNameInput = this.lastNameInput.bind(this);
		this.idInput = this.idInput.bind(this);
		this.searchPerson = this.searchPerson.bind(this);
		this.searchById = this.searchById.bind(this);
		this.searchByName = this.searchByName.bind(this);
		this.displayResults = this.displayResults.bind(this);
		this.displayNoResult = this.displayNoResult.bind(this);
	}
	firstNameInput(e){
		this.setState({
			firstName: e.target.value,
			noResult : false
		});
	}
	lastNameInput(e){
		this.setState({
			lastName: e.target.value,
			noResult : false
		});
	}
	idInput(e){
		this.setState({
			empId: e.target.value,
			noResult : false
		});
	}
	searchPerson(){
		const {firstName, lastName, empId} = this.state;
		if(empId.length){
			this.searchById();
		}else if(firstName.length || lastName.length){
			this.searchByName();
		}
	}
	searchById(){
		const {empId} = this.state;
		const url = 'https://piedpiper.briandhkim.fun/table/access.php?action=';
		const action = 'search_by_id';

		axios({
			url: `${url}${action}&employee_id=${empId}`,
			method: 'GET'
		})
		.then((res)=>{
			const response = res.data;
			console.log(response);
			if(response.success){
				this.displayResults(response.data);
			}else{
				this.displayNoResult();
			}
		})
		.catch((err)=>{
			console.log(err);
		});

	}
	searchByName(){
		const {firstName, lastName} = this.state;
		const url = 'https://piedpiper.briandhkim.fun/table/access.php?action=';
		const action = 'search_by_name';

		axios({
			url: `${url}${action}&first_name=${firstName}&last_name=${lastName}`,
			method: 'GET'
		})
		.then((res)=>{
			const response = res.data;
			console.log(response);
			if(response.success){
				this.displayResults(response.data);
			}else{
				this.displayNoResult();
			}
		})
		.catch((err)=>{
			console.log(err);
		});
	}
	searchByFirstName(){
		const {firstName} = this.state;
		const firstNCap = firstName[0].toUpperCase() + firstName.slice(1,);
		const empTable = firebase.database();
		empTable.ref('Employees')
			.orderByChild('first_name').equalTo(firstNCap.trim())
			.once('value').then((snapshot)=>{
				// console.log(snapshot.val());
				const data = [];
				snapshot.forEach((child) => {
		            data.push({[child.key] : child.val()});
		        });
		        this.displayResults(data);
			});
	}
	searchByLastName(){
		const {lastName} = this.state;
		const lastNCap = lastName[0].toUpperCase() + lastName.slice(1,);
		const empTable = firebase.database();
		empTable.ref('Employees')
			.orderByChild('last_name').equalTo(lastNCap.trim())
			.once('value').then((snapshot)=>{
				// console.log(snapshot.val());
				const data = [];
				snapshot.forEach((child) => {
		            data.push({[child.key] : child.val()});
		        });
		        this.displayResults(data);
			});
		
	}
	displayResults(data){
		const {setData, closeModal} = this.props;
		if(data.length){
			setData(data);
		}else{
			this.displayNoResult();
			return;
		}
		closeModal();
	}
	displayNoResult(){
		this.setState({
			firstName: '',
			lastName: '',
			empId: '',
			noResult: true
		});
	}

	render(){
		const {noResult} = this.state;
		return(
			<div className='form-horizontal'>
				<form>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.firstName}
							placeholder="Search by first name"
							onChange={this.firstNameInput}
						/>
					</FormGroup>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.lastName}
							placeholder="Search by last name"
							onChange={this.lastNameInput}
						/>
					</FormGroup>
					<FormGroup className='input-group'>
						<span className='input-group-addon'>
							<Glyphicon glyph="pencil"/>
						</span>
						<FormControl 
							type='text'
							value={this.state.empId}
							placeholder="Search by employee ID"
							onChange={this.idInput}
						/>
					</FormGroup>

					<Button className='btn-block btn-info' onClick={this.searchPerson}>
						Search
					</Button>
					<span className={`text-danger ${noResult ? 'show' : 'hidden'}`}>
						<h4>No results found</h4>
					</span>
				</form>
			</div>
		)
	}
}

export default SearchModal;