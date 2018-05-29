
// function(store){
// 	return function(next){
// 		return function(action){
// 			//content
// 		}
// 	}
// }

export default store => next=> action =>{
	console.log('action:', action);
	const result = next(action);

	console.log('next state:', store.getState());

	return result;
}