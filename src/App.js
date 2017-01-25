import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import _ from 'underscore';

import title from './plus-tourist.png';
import logo from './logo.png';

import './App.scss';
import MapLocation from './map_location.jsx';

const defaultLocation = { lat: 60.170, lng: 24.970 };
const transitionTime = 700;

const API = {
	search: function( term ) {
		return fetch( '//plustourist.com/api/search.php', {
			method: 'post',
	        headers: {  
	          "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"  
	        },
			body: 'type=location&query=' + term
		})
		.then( function( res ) {
			return res.json();
		})
		.catch( function( error ) {
			console.log('Request failed', error);  
		});
	}
};

var get_distance = (lat1, lon1, lat2, lon2) => {

	// Earth in km
	let radius = 6371;

	let deg2rad = (degrees) => {
		return degrees * Math.PI / 180;
	}

	let dLat = deg2rad( lat2 - lat1 );
	let dLon = deg2rad( lon2 - lon1 );

	let a = Math.sin( dLat/2 ) * Math.sin( dLat/2 ) +
	Math.cos(deg2rad( lat1 )) * Math.cos(deg2rad( lat2 )) * 
	Math.sin( dLon/2 ) * Math.sin( dLon/2 );

	let c = 2 * Math.atan( Math.sqrt(a), Math.sqrt(1-a) ); 
	let distance = radius * c; // Distance in km

	// Distance in meters
	return distance * 1000;
};

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};

		this.onChange = this.onChange.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.submit = this.submit.bind(this);
	}

	onChange(e) {
		this.setState({ value: e.target.value });
	}

	onKeyDown(e) {
		if ( e.keyCode === 13 ) {
			this.props.onSearch( this.state.value );
		}
	}

	submit(e) {
		this.props.onSearch( this.state.value );
	}

	render() {
		return (
			<div className="search input-group">
				<input type="text" value={this.state.value} onChange={this.onChange}  onKeyDown={this.onKeyDown} className="input form-control" placeholder="Search for an accessible hotel, cafe, bar.." />
				<span className="search-btn input-group-btn">
					<button className="btn btn-secondary" onClick={this.submit} type="button">Go</button>
				</span>
			</div>
		);
	}
}

export default class SimpleMapPage extends Component {

	static defaultProps = {
		center: defaultLocation,
		zoom: 13,
		loading: true,
		transition: false,
		term: 'cafe'
	};

	constructor( props ) {
		super( props );

		this.state = Object.assign({
			places: [],
			markers: [],
			selected: {}
		}, props);

		this.doSearch = this.doSearch.bind(this);
		this.selectMenuItem = this.selectMenuItem.bind(this);
		this.onMarkerSelect = this.onMarkerSelect.bind(this);
		this.onMarkerEnter = this.onMarkerEnter.bind(this);
		this.onMarkerLeave = this.onMarkerLeave.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		let term = this.state.term;
		this.doSearch( term )
	}

	formatResults ( results ) {
		let selected = this.state.selected;

		return results.map(( result ) => {
			let item = Object.assign({}, result);

			return _.extend(item, {
				phone: _.isEmpty(item.phone) ? '' : 'tel: ' + item.phone,
				is_selected: item.id === selected.id
			});
		})
	}

	doSearch( term) {
		let self = this;

		// reset current items
		self.setState({
			places: [],
			loading: true
		});

		API.search( term ).then(function( res ) {

			if ( res && res.status === 200 ) {

				let places = _.map(res.results, ( item ) => {
					item.latitude = parseFloat(item.latitude);
					item.longitude = parseFloat(item.longitude);
					return item;
				});

				let selected = places.length ? _.first(places) : {};

				self.setState({
					places: places,
					loading: false,
					selected: selected
				});
			}
		});
	}

	selectMenuItem(e) {
		e.preventDefault();
		let target = e.currentTarget;

		let current = this.state.selected;

		let selected = _.find(this.state.places, (item) => {
			return item.id === parseInt(target.id, 10);
		});

		let distance = get_distance(selected.latitude, selected.longitude, current.latitude, current.longitude);
		let max_distance = 5000;

		let transition = distance < max_distance;

		this.setState({
			selected: selected,
			transition: transition
		})
	}

	onMarkerSelect(id) {
		let selected = _.find(this.state.places, (item) => {
			return item.id === parseInt(id, 10);
		});

		this.setState({
			selected: selected,
			transition: true
		})
	}

	onMarkerEnter(id) {
		// console.log('enter', id);
	}

	onMarkerLeave(id) {
		// console.log('leave', id);
	}

	onChange(id) {
		let self = this;

		if ( this.state.transition ) {
			setTimeout(() => {
				self.setState({
					transition: false
				})
			}, transitionTime);
		}
	}

	render() {
		let state = this.state;
		let items = this.formatResults( state.places );
		let selected = state.selected;

		// Center the map depending on window width
		let offset = 0.035 * (1200 / window.outerWidth);

		let position = selected ? {
			lat: selected.latitude,
			lng: selected.longitude + offset
		} : this.props.center;

		let container = state.loading ? 'results loading' : 'results';
		let map_container = state.transition ? 'col-12 map-container transition' : 'col-12 map-container';

		return (
			<div className="container-fluid app">
				<div className="row header">
					<div className="col-3 brand">
						<img src={logo} className="logo" alt="logo" />
						<h2 className="title hidden-md-down">
							<img src={title} className="title" alt="Plus Tourist" />
						</h2>
					</div>
					<div className="col-6">
						<SearchComponent onSearch={this.doSearch} />
					</div>
					<div className="col-3"></div>
				</div>
				<div className="row content">
					<div className={map_container}>

						<GoogleMap
							bootstrapURLKeys={{
								key: 'AIzaSyBASoIltUYEdmuTOs_x0ssvJHkoYTdtPvQ',
								language: 'en'
							}}
							defaultCenter={this.props.center}
							defaultZoom={this.props.zoom}
							onChildClick={this.onMarkerSelect}
					        onChildMouseEnter={this.onMarkerEnter}
					        onChildMouseLeave={this.onMarkerLeave}
					        onChange={this.onChange}
							center={position}>
							{items.map(( item ) => (
							<MapLocation 
								key={item.id}
								lat={item.latitude}
								lng={item.longitude}
								item={item}
								is_selected={item.is_selected}
								zIndex={2} />
							))}
						</GoogleMap>

						<div className={container}>
							<div className="row">
								<div className="col-12 no-padding">

									<div className="list-group">
										{items.map(( item ) => {
											let item_class = 'item list-group-item list-group-item-action flex-column align-items-start';
											item_class += item.is_selected ? ' selected' : '';

											return (
												<a href="#" id={item.id} key={item.id} onClick={this.selectMenuItem} className={item_class}>
													<div className="d-flex w-100 justify-content-between">
														<h5 className="mb-1 title">{item.name_en}</h5>
														<small className="text-muted">{item.latitude}, {item.longitude}</small>
													</div>
													<p className="mb-1">{item.street_address_en}, {item.address_zip} {item.address_city_en}</p>
													<small className="text-muted text-left">{item.phone}</small>
												</a>
												)
										})}
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
