
import React, {PropTypes, Component} from 'react';

const locationStyle = {
	position: 'absolute',
	width: 30,
	height: 30,
	left: 0,
	top: -15,
	textAlign: 'center',
	fontWeight: 'normal',
	fontSize: 30,
	padding: 0,
	cursor: 'pointer'
};

export default class MapLocation extends Component {
	static propTypes = {
		item: PropTypes.object,
		is_selected: PropTypes.bool
	};

	render() {
		let item = this.props.item;
		let is_selected = this.props.is_selected;
		let container = is_selected ? 'marker icon icon-location2 current' : 'marker icon icon-location';

		return (
			<div style={locationStyle} className={container}>
				<div className="description">
					<div className="pointer"></div>
					<h5>{item.name_en}</h5>
					<p>{item.desc_en}</p>
					<a href={item.www_en} target="_blank">Visit website</a>
				</div>
			</div>
		);
	}
}