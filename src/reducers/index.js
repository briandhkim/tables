import { combineReducers } from 'redux';
import empTableReducer from './employee_table_reducer.js';

export default combineReducers(
	{
		table: empTableReducer
	}
);