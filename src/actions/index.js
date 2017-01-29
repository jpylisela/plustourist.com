
export const setLoader = (ownProps, value) => {
	return {
		type: 'SET_LOADER',
		value
	}
}

export const updatePlaces = (ownProps, items) => {
 	return {
		type: 'UPDATE_PLACES',
		items
	};
}

export const setTransition = (ownProps, value) => {
	return {
		type: 'SET_TRANSITION',
		value
	}
}

export const calculateTransition = (ownProps, args) => {
	return {
		type: 'CALCULATE_TRANSITION',
		args
	}
}

export const setSearchTerm = (ownProps, term) => {
	console.log('setSearchTerm', term);

	return {
		type: 'SET_SEARCH_TERM',
		term
	}
}

export const setActiveFilter = (ownProps, args) => {
	console.log('setActiveFilter');

	return {
		type: 'SET_ITEM_ACTIVE',
		item: args.item
	}
}