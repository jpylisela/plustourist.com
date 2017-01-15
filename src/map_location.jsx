
import React, {PropTypes, Component} from 'react';

const locationStyle = {
	position: 'absolute',
	width: 20,
	height: 20,
	left: -10,
	top: -10,
	borderRadius: 10,
	backgroundColor: 'white',
	textAlign: 'center',
	color: '#3f51b5',
	fontSize: 11,
	fontWeight: 'normal',
	padding: 0,
	cursor: 'pointer'
};

export default class MapLocation extends Component {
	static propTypes = {
		text: PropTypes.string
	};

 	static defaultProps = {};

	render() {
		let item = this.props.item;
		let is_current = this.props.is_current;
		let container = is_current ? 'marker current' : 'marker';

		return (
			<div style={locationStyle} className={container}>
				<div className="description">
					<h5>{item.name_en}</h5>
					<p>{item.desc_en}</p>
					<a href={item.www_en} target="_blank">Visit website</a>
				</div>
			</div>
		);
	}
}