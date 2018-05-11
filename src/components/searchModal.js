import React, {Component} from 'react';
import {FormGroup, Glyphicon, FormControl, Button} from 'react-bootstrap';
import firebase from './firebase/firebase';

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
		this.searchByFirstName = this.searchByFirstName.bind(this);
		this.searchByLastName = this.searchByLastName.bind(this);
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
		if(firstName.length){
			this.searchByFirstName();
		}else if(lastName.length){
			this.searchByLastName();
		}else if(empId.length){
			this.searchById();
		}
	}
	searchById(){
		const {empId} = this.state;
		const empTable = firebase.database();
		empTable.ref('Employees')
			.orderByChild('id').equalTo(empId)
			.once('value').then((snapshot)=>{
				// console.log(snapshot.val());
				const data = [];
				snapshot.forEach((child) => {
		            data.push({[child.key] : child.val()});
		        });
		        this.displayResults(data);
			});
	}
	searchByFirstName(){
		const {firstName} = this.state;
		const firstNCap = firstName[0].toUpperCase() + firstName.slice(1,);
		const empTable = firebase.database();
		empTable.ref('Employees')
			.orderByChild('first_name').equalTo(firstNCap)
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
			.orderByChild('last_name').equalTo(lastNCap)
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