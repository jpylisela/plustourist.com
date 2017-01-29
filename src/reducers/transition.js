
const get_distance = (lat1, lon1, lat2, lon2) => {

	// Earth in km
	let radius = 6371;

	let deg2rad = (degrees) => {
		return degrees * Math.PI / 180;
	}

	let dLat = deg2rad(lat2-lat1);
	let dLon = deg2rad(lon2-lon1);

	let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
	Math.sin(dLon/2) * Math.sin(dLon/2);

	let c = 2 * Math.atan(Math.sqrt(a), Math.sqrt(1-a)); 
	let distance = radius * c; // Distance in km

	// Distance in meters
	return distance * 1000;
};

const transition = (state = false, action) => {

	if (action.type === 'SET_TRANSITION') {
	  	return action.value;
	}

	if (action.type === 'CALCULATE_TRANSITION') {
		let current = action.args.center;
		let selected = action.args.item;

		let distance = get_distance(selected.latitude, selected.longitude, current.lat, current.lng);
		let max_distance = 5000;

	  	return distance < max_distance;
	}

 	return state;
}

export default transition