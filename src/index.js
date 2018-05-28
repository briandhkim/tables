import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import logger from './middleware/logger';
import promise from './middleware/promise_resolver';
import rootReducer from './reducers/index';

import App from './components/app';

ReactDOM.render(
	<Provider store={ createStore(rootReducer, applyMiddleware(promise, logger)) }>
	    <App />
    </Provider>,
    document.getElementById('root')
);
