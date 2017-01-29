const selected = (state=0, action) => {

	if (action.type === 'SET_ITEM_ACTIVE') {
	  	return parseInt( action.item.id, 10 );
	}

	return state;
}

export default selected