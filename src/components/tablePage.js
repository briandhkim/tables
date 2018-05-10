import React, {Component} from 'react';
// import * as firebase from 'firebase/database';
import firebase from './firebase/firebase';

class TablePage extends Component{
	constructor(props){
		super(props);
		this.state={}
	}

	componentDidMount(){

	}

	render(){
		const empTable = firebase.database();
		empTable.ref('Employees').on('value', (snapshot)=>{
			// debugger;
			console.log('snapshot', snapshot);
		});
		return(
			<div>
				tablePage test
			</div>
		)
	}
}

export default TablePage;