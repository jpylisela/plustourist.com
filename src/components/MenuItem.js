import React, { PropTypes } from 'react'

const MenuItem = ({ id, item, selectMenuItem }) => {

	let item_class = 'item list-group-item list-group-item-action flex-column align-items-start';
	item_class += item.active ? ' selected' : '';

	let phone = item.phone ? 'tel: ' + item.phone : '-';
	let address = '-';

	if ( item.street_address_en ) {
		address = item.street_address_en + ' ' + item.address_city_en + ' ' + item.address_zip;
	}

	return (
		<a href="#" id={item.id} key={item.id} onClick={selectMenuItem} className={item_class}>
			<div className="d-flex w-100 justify-content-between">
				<h5 className="mb-1 title">{item.name_en}</h5>
				<small className="text-muted">{item.latitude}, {item.longitude}</small>
			</div>
			<p className="mb-1">{address}</p>
			<small className="text-muted text-left">{phone}</small>
		</a>
	)
}

MenuItem.propTypes = {
	id: PropTypes.number.isRequired,
	item: PropTypes.object.isRequired,
	selectMenuItem: PropTypes.func.isRequired
}

export default MenuItem


