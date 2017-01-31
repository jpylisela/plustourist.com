
import React, {Component} from 'react';
import {connect} from 'react-redux';
import GoogleMap from 'google-map-react';
import _ from 'underscore';

import title from '../img/plus-tourist.png';
import logo from '../img/logo.png';

import { setLoader, setActiveFilter, updatePlaces, setSearchTerm, calculateTransition, setTransition } from '../actions'
import SearchComponent from '../containers/SearchComponent'
import VisibleMenuItemList from '../containers/VisibleMenuItemList'

import '../Application.scss';
import MapLocation from './MapLocation';

const transitionTime = 700;

const defaultLocation = {
	lat: 60.17,
	lng: 24.97
};

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

class ContainerView extends Component {

	constructor( props ) {
		super( props );

		this.doSearch = this.doSearch.bind(this);
		this.onMarkerSelect = this.onMarkerSelect.bind(this);
		this.onMarkerEnter = this.onMarkerEnter.bind(this);
		this.onMarkerLeave = this.onMarkerLeave.bind(this);
		this.onChange = this.onChange.bind(this);
		
	}

	componentDidMount () {
		let term = this.props.term;
		this.doSearch( term );
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

	doSearch( term ) {
		let props = this.props;
		props.setLoader(true);

		API.search( term ).then(function( res ) {

			if ( res && res.status === 200 ) {
				let places = _.map(res.results, ( item ) => {
					item.latitude = parseFloat(item.latitude);
					item.longitude = parseFloat(item.longitude);
					return item;
				});

				props.setSearchTerm(term);
				props.updateItems(places);
			}
		});
	}

	onMarkerSelect(id) {

		let selected = _.find(this.props.places, (item) => {
			return item.id === parseInt(id, 10);
		});

		this.props.selectMarker({
			item: selected,
			center: this.props.center
		});
	}

	onMarkerEnter(e) {
		// console.log('enter', e);
	}

	onMarkerLeave(e) {
		// console.log('leave', e);
	}

	onChange(e) {
		let self = this;

		if ( this.props.transition ) {
			setTimeout(() => {
				self.props.setTransition(false);
			}, transitionTime);
		}
	}

	render() {
		let props =  this.props;
		let items =  props.places;

		// Fetch center by selected ID
		let position = props.center;
		let center = props.center;

		let container = props.loading ? 'results loading' : 'results';
		let map_container = props.transition ? 'map-container transition' : 'map-container';

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
					<div className="col-12 main-container">
						<div className={map_container}>
							<GoogleMap
								bootstrapURLKeys={{
									key: 'AIzaSyBASoIltUYEdmuTOs_x0ssvJHkoYTdtPvQ',
									language: 'en'
								}}
								defaultCenter={defaultLocation}
								defaultZoom={13}
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
									is_active={item.active}
									zIndex={2} />
								))}
							</GoogleMap>
						</div>
						<div className={container}>
							<div className="row">
								<div className="col-12 no-padding">
									<VisibleMenuItemList center={center} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


const mapStateToProps = (state) => {
	return {
		term: state.term,
		places: state.places,
		center: state.center,
		selected: state.selected,
		transition: state.transition,
		loading: state.loading,
		zoom: state.zoom
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
		setLoader: (value) => {
			dispatch(setLoader(ownProps, value));
		},
		setSearchTerm: (term) => {
			dispatch(setSearchTerm(ownProps, term));
		},
		updateItems: (places) => {
			dispatch(updatePlaces(ownProps, places));
		},
		selectMarker: (args) => {
      		dispatch(calculateTransition(ownProps, args));
			dispatch(setActiveFilter(ownProps, args));
		},
		setTransition: (value) => {
			dispatch(setTransition(ownProps, value));
		}
	}
}

const Application = connect(
	mapStateToProps,
	mapDispatchToProps
)(ContainerView)

export default Application

