import _ from 'underscore';

const places = (state, action) => {

	switch (action.type) {

		case 'SET_LOADER':
			return [];

		case 'SET_ITEM_ACTIVE':
			return state.map((item) => {
				item.active = (item.id === action.item.id);
				return item;
			});

		case 'UPDATE_PLACES':
			let first = action.items ? _.first(action.items).id : null;

			return action.items.map((item) => {
				return Object.assign({active: item.id === first}, item);
			});

		default:
			return state || [];
	}
}

export default places