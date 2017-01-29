const loading = (state = true, action) => {

	switch (action.type) {
		
		case 'UPDATE_PLACES':
			return false;

		case 'SET_LOADER':
			return action.value;

		default:
			return state;
	}
}

export default loading