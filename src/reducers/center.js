import _ from 'underscore';

const center = (state, action) => {

	const default_location = {
		lat: 60.17,
		lng: 24.97
	};

	switch (action.type) {

		case 'SET_ITEM_ACTIVE':
			let item = action.item;

		  	return {
		  		lat: parseFloat(item.latitude),
		  		lng: parseFloat(item.longitude),
		  	}

		case 'UPDATE_PLACES':

			if ( action.items.length ) {
				let first = _.first(action.items);

				return {
			  		lat: parseFloat(first.latitude),
			  		lng: parseFloat(first.longitude),
			  	}
			}

		default:
			return state || default_location;
	}


	return state || default_location;
}

export default center