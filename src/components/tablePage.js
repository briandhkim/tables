import React, {Component} from 'react';
// import firebase from './firebase/firebase';
import axios from 'axios';
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
			empId: '',
			empPhone: '',
			empSuper: '',
			addError: false,
			modalShow: false
		}
		this.getAllData = this.getAllData.bind(this);
		this.setEmpData = this.setEmpData.bind(this);
		this.handleEmployeeAdd = this.handleEmployeeAdd.bind(this);
		this.empNameInput = this.empNameInput.bind(this);
		this.empIdInput = this.empIdInput.bind(this);
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
			empData : data
		});
	}
	handleEmployeeAdd(e){
		e.preventDefault();
		const {empName, empId, empPhone, empSuper} = this.state;
		if(!empName.length||!empId.length||!empPhone.length||!empSuper.length){
			this.setState({addError: true});
			return;
		}else{
			const phoneFiltered = empPhone.replace(/\D+/g,'');
			const nameFilter = empName.split(' ');
			let firstName = '';
			let lastName = '';
			if(nameFilter[0].includes(',')){
				lastName = nameFilter[0].replace(',','');
				firstName = nameFilter[1];
			}else{
				lastName = nameFilter[1];
				firstName = nameFilter[0];
			}
			const sendData = {
				first_name	: firstName,
				last_name 	: lastName,
				id 			: empId,
				phone 		: phoneFiltered,
				supervisor 	: empSuper
			};
			const empTable = firebase.database();
			empTable.ref('Employees').push(sendData).then(()=>{
				this.clearInput();
				this.getAllData();
			});
		}
	}
	empNameInput(e){
		this.setState({
			empName: e.target.value,
			addError: false
		});
	}
	empIdInput(e){
		this.setState({
			empId: e.target.value,
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
			empSuper: ''
		});
	}
	downloadCSV(){
		const {empData} = this.state;
		let csvContent = "data:text/csv;charset=utf-8,First Name,Last Name,ID,Phone,Supervisor\n";
		empData.forEach((node)=>{
			const empl = Object.values(Object.values(node)[0]);
			// console.log(empl);
			const phone = '('+empl[3].slice(0,3)+') '+empl[3].slice(3,6)+'-'+empl[3].slice(6);
			csvContent += empl[0]+","+empl[2]+","+empl[1]+","+phone+","+empl[4]+"\n";
		});
		const encodeUri = encodeURI(csvContent);
		let linkElmt = $('<a>',{
			class: 'csvLink',
			href: encodeUri,
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
		const {empData, addError} = this.state;
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
							</Label>
						</small>
					</h1>
					<h3 className='visible-xs h3-responsive'>
						<strong>Employee Table</strong>
						<small>
							<Label>
								Pied Piper
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
								<Glyphicon glyph="info-sign"/>
							</span>
							<FormControl 
								type='text'
								value={this.state.empId}
								placeholder="Employee ID"
								onChange={this.empIdInput}
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
							Add 
						</Button>
						<span className={`${addError ? 'show':'hidden'} text-danger`}>
							Fill in all fields!
						</span>
						<Button className='btn-primary btn-block' onClick={this.getAllData}>
							Load All
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