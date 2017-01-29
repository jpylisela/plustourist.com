const term = (state="cafe", action) => {

	if ( action.type === 'SET_SEARCH_TERM' ) {
		console.log('SET_SEARCH_TERM', action);
		state = action.term;
	}

  return state;
}

export default term