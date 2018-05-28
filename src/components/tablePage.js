import React, {Component} from 'react';
// import firebase from './firebase/firebase';
import axios from 'axios';
import qs from 'qs';
import {PageHeader, Table, FormControl, FormGroup, Button, Glyphicon, Modal, Label, Popover, OverlayTrigger} from 'react-bootstrap';
import $ from 'jquery';
import TableData from './tableData';
import SearchModal from './searchModal';
import './tablePage.css';

class TablePage extends Component{
	constructor(props){
		super(props);
		this.state={
			empData: null,
			empName: '',
			empPhone: '',
			empSuper: '',
			addError: false,
			modalShow: false,
			addProgress: false,
			loadAllProgress: true
		}
		this.getAllData = this.getAllData.bind(this);
		this.setEmpData = this.setEmpData.bind(this);
		this.handleEmployeeAdd = this.handleEmployeeAdd.bind(this);
		this.empNameInput = this.empNameInput.bind(this);
		this.empPhoneInput = this.empPhoneInput.bind(this);
		this.empSuperInput = this.empSuperInput.bind(this);
		this.clearInput = this.clearInput.bind(this);
		this.downloadCSV = this.downloadCSV.bind(this);
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount(){
		this.getAllData();
	}
	getAllData(){
		const action = 'get_all_data';
		const url = 'https://piedpiper.briandhkim.fun/table/access.php?action=';
		axios({
			url: `${url}${action}`,
			method: 'GET'
		})
		.then((res)=>{
			// console.log(res.data);
			const response = res.data;
			if(response.success){
				this.setEmpData(response.data);
			}else{
				console.log(response.errors);
			}
		})
		.catch((err)=>{
			console.log(err);
		})
	}
	setEmpData(data){
		// console.log(data);
		this.setState({
			empData : data,
			loadAllProgress: false
		});
	}
	handleEmployeeAdd(e){
		e.preventDefault();
		const {empName, empPhone, empSuper} = this.state;
		if(!empName.length||!empPhone.length||!empSuper.length){
			this.setState({addError: true});
			return;
		}else{
			const phoneFiltered = empPhone.replace(/\D+/g,'');
			const nameFilter = empName.split(' ');
			let firstName = '';
			let lastName = '';
			//name filter to first and last
			if(nameFilter[0].includes(',')){
				lastName = nameFilter[0].replace(',','');
				firstName = nameFilter[1];
			}else{
				lastName = nameFilter[1];
				firstName = nameFilter[0];
			}

			const url = 'https://piedpiper.briandhkim.fun/table/access.php';
			const data = {
				action			: 'add_employee',
				first_name		: firstName,
				last_name 		: lastName,
				phone_number 	: phoneFiltered,
				supervisor 		: empSuper
			};
			this.setState({addProgress: true});
			axios.post(url,
				qs.stringify(data)
			)
			.then((res)=>{
				const response = res.data;
				if(response.success){
					console.log(response.messages);
					this.clearInput();
					this.getAllData();
				}
			})
			.catch((err)=>{
				console.log(err);
			});
			
		}
	}
	empNameInput(e){
		this.setState({
			empName: e.target.value,
			addError: false
		});
	}
	empPhoneInput(e){
		this.setState({
			empPhone: e.target.value,
			addError: false
		});
	}
	empSuperInput(e){
		this.setState({
			empSuper: e.target.value,
			addError: false
		});
	}
	clearInput(){
		this.setState({
			empName: '',
			empId: '',
			empPhone: '',
			empSuper: '',
			addProgress: false
		});
	}
	downloadCSV(){
		const {empData} = this.state;

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

		const encoded = csvOutput(empData);

		let linkElmt = $('<a>',{
			class: 'csvLink',
			href: encoded,
			download: "employee_data.csv"
		}).appendTo('body');
		$('.csvLink')[0].click();
		$('.csvLink').remove();
	}
	showModal(){
		this.setState({modalShow:true});
	}
	closeModal(){
		this.setState({modalShow:false});
	}
	render(){
		const {empData, addError, addProgress, loadAllProgress} = this.state;
		const tableRows = empData ? empData.map((emp, idx)=>{
			return <TableData key={idx} index={idx} employee={emp} refreshData={this.getAllData}/>
		}):<tr></tr>;
		const csvPopover = (
			<Popover id="popover-trigger-hover-focus">
				download as CSV
			</Popover>
		);
		return(
			<div className='container-fluid'>
				<div className='page-header col-xs-12 col-sm-10 col-sm-offset-1'>
					<h1 className='hidden-xs h1-responsive'>
						<strong>Employee Table</strong>
						<small>
							<Label>
								Pied Piper
								<i className="fa fa-pied-piper-alt fa-lg" aria-hidden="true"></i>
							</Label>
						</small>
					</h1>
					<h3 className='visible-xs h3-responsive'>
						<strong>Employee Table</strong>
						<small>
							<Label>
								Pied Piper
								<i className="fa fa-pied-piper-alt fa-lg" aria-hidden="true"></i>
							</Label>	
						</small>
					</h3>
				</div>

				<div className='form-horizontal col-sm-12 col-md-2 col-md-push-9 addForm'>
					<h4><strong>Add Employee</strong></h4>
					<form>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="user"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empName}
								placeholder="Employee Name"
								onChange={this.empNameInput}
							/>
						</FormGroup>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="earphone"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empPhone}
								placeholder="Employee Phone"
								onChange={this.empPhoneInput}
							/>
						</FormGroup>
						<FormGroup className='input-group'>
							<span className='input-group-addon'>
								<Glyphicon glyph="king"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empSuper}
								placeholder="Supervisor"
								onChange={this.empSuperInput}
							/>
						</FormGroup>
						<Button className='btn-success btn-block empAddBtn' onClick={this.handleEmployeeAdd}>
							<span className={`${addProgress ? 'show' : 'hidden'}`}>
								Adding... <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
							</span>
							<span className={`${addProgress ? 'hidden' : 'show'}`}>
								Add
							</span>
						</Button>
						<span className={`${addError ? 'show':'hidden'} text-danger`}>
							Fill in all fields!
						</span>
						<Button className='btn-primary btn-block' onClick={this.getAllData}>
							<span className={`${loadAllProgress ? 'show' : 'hidden'}`}>
								Loading... <i className="fa fa-spinner fa-pulse fa-lg fa-fw"></i>
							</span>
							<span className={`${loadAllProgress ? 'hidden' : 'show'}`}>
								Load All
							</span>
						</Button>
						<Button className='btn-info btn-block' onClick={this.showModal}>
							Search
						</Button>
						<OverlayTrigger trigger={['hover','focus']} placement="left" overlay={csvPopover}>
							<Button className='label-default pull-right csvBtn' onClick={this.downloadCSV}>
								<Glyphicon glyph='download-alt' />
							</Button>
						</OverlayTrigger>
					</form>
				</div>

				<div className='col-sm-12 col-md-8 col-md-pull-1 table-responsive'>
					<Table striped bordered condensed hover>
						<thead className='font-weight-bold'>
							<tr className='warning'>
								<th className='text-center'>Name</th>
								<th className='text-center'>ID</th>
								<th className='text-center'>Supervisor</th>
								<th className='text-center'>Phone</th>
								<th className='text-center'>Delete</th>
							</tr>
						</thead>
						
						<tbody className='text-center'>
							{tableRows}
						</tbody>
						
					</Table>
				</div>
				<Modal show={this.state.modalShow} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Search Employee</Modal.Title>
						<Modal.Body>
							<SearchModal setData={this.setEmpData} closeModal={this.closeModal}/>
						</Modal.Body>
					</Modal.Header>

				</Modal>
			</div>
		)
	}
}

export default TablePage;