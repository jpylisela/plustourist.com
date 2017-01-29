const term = (state = "cafe", action) => {

	if ( action.type === 'SET_SEARCH_TERM' ) {
		state = action.term;
	}

  return state;
}

export default term