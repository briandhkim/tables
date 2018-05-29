import React, {Component} from 'react';
import {PageHeader, Table, FormControl, FormGroup, Button, Glyphicon, Modal, Label} from 'react-bootstrap';
import $ from 'jquery';
import TableData from './tableData';
import SearchModal from './searchModal';
import './tablePage.css';
import FormAndButtons from './formAndButtons';

import { connect } from 'react-redux';
import { getAllData, openModal, hideModal } from '../actions/index';

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
		this.showModal = this.showModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	componentDidMount(){
		// this.getAllData();
		this.props.getAllData();
	}
	
	
	showModal(){
		this.setState({modalShow:true});
	}
	closeModal(){
		this.setState({modalShow:false});
	}
	render(){
		const{employeeData, hideModal, showModal} = this.props;
		const tableRows = employeeData ? employeeData.map((emp, idx)=>{
			return <TableData key={idx} index={idx} employee={emp} refreshData={this.getAllData}/>
		}):<tr></tr>;

	

		const {empData, addError, addProgress, loadAllProgress} = this.state;
		
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

				<FormAndButtons  />

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
							{tableRows ? tableRows : <tr></tr>}
						</tbody>
						
					</Table>
				</div>
				<Modal show={showModal} onHide={hideModal}>
					<Modal.Header closeButton>
						<Modal.Title>Search Employee</Modal.Title>
						<Modal.Body>
							<SearchModal />
						</Modal.Body>
					</Modal.Header>

				</Modal>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
		employeeData: state.table.employeeData,
		retrievingInProgress: state.table.retrievingInProgress,
		showModal : state.table.showModal
	}
}

// export default TablePage;
export default connect(mapStateToProps, {getAllData, openModal, hideModal})(TablePage);