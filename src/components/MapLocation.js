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
		is_active: PropTypes.bool
	};

	render() {
		let item = this.props.item;
		let is_active = this.props.is_active;
		let container = is_active ? 'marker icon icon-location2 current' : 'marker icon icon-location';

		return (
			<div style={locationStyle} className={container}>
				<div className="description">
					<div className="pointer"></div>
					<h5>{item.name_en}</h5>
					<p>{item.desc_en}</p>
					{item.www_en &&
						<a href={item.www_en} target="_blank">Visit website</a>
					}
				</div>
			</div>
		);
	}
}