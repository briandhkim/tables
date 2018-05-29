import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import rootReducer from './reducers/index';

import App from './components/app';

ReactDOM.render(
	<Provider store={ createStore(rootReducer, applyMiddleware(promise)) }>
	    <App />
    </Provider>,
    document.getElementById('root')
);
