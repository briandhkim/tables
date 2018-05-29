import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import empTableReducer from './employee_table_reducer.js';

export default combineReducers(
	{
		form: formReducer,
		table: empTableReducer
	}
);