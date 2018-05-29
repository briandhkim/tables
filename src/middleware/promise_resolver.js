
export default store => next => action =>{

	if(action.payload && typeof action.payload.then ==='function'){
		action.payload.then(resp=>{
			// const newAction = { ...action, payload: resp};
			const newAction = {payload: resp};
			store.dispatch(newAction);
		});
		return action.payload;
	}
	// console.log('no promise');

	return next(action);
}