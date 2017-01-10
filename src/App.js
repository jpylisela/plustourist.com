import React, {Component} from 'react';
import GoogleMap from 'google-map-react';
import _ from 'underscore';

import title from './plus-tourist.png';
import logo from './logo.png';
import './App.scss';


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

class SearchComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {value: ''};

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
				<input type="text" value={this.state.value} onChange={this.onChange}  onKeyDown={this.onKeyDown} className="input form-control" placeholder="Search for..." />
				<span className="search-btn input-group-btn">
					<button className="btn btn-secondary" onClick={this.submit} type="button">Go</button>
				</span>
			</div>
		);
	}
}

export default class SimpleMapPage extends Component {

	static defaultProps = {
		center: { lat: 60.170, lng: 24.970 },
		zoom: 13,
		term: 'ateneum'
	};

	constructor( props ) {
		super( props );

		this.state = Object.assign({
			places: [],
			current: null
		}, props);

		this.doSearch = this.doSearch.bind(this);
	}

	componentDidMount () {
		let term = this.state.term;
		this.doSearch( term )
	}

	formatResults ( items ) {
		return items.map(( item ) => {
			return Object.assign(item, {
				phone: _.isEmpty(item.phone) ? '' : 'tel: ' + item.phone
			});
		})
	}

	doSearch( term) {
		let self = this;
		console.log('search', term);

		API.search( term ).then(function( res ) {
			console.log( 'res', res );

			if ( res && res.status === 200 ) {
				let places = res.results;
				let current = places.length ? _.first(places).id : null;

				self.setState({
					places: places,
					current: current
				});
			}
		});
	}

	render() {
		let items = this.formatResults(this.state.places);

		console.log('render', items);

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
					<div className="col-12 map-container">
						<GoogleMap
							bootstrapURLKeys={{
								key: 'AIzaSyBASoIltUYEdmuTOs_x0ssvJHkoYTdtPvQ',
								language: 'en'
							}}
							defaultCenter={this.props.center}
							defaultZoom={this.props.zoom}>
						</GoogleMap>

						<div className="container-fluid results">
							<div className="row">
								<div className="col-12 no-padding">

									<div className="list-group">

										{items.map(( item ) => (
										<a href="#" key={item.id} className="item list-group-item list-group-item-action flex-column align-items-start">
											<div className="d-flex w-100 justify-content-between">
												<h5 className="mb-1 title">{item.name_en}</h5>
												<small className="text-muted">{item.latitude}, {item.longitude}</small>
											</div>
											<p className="mb-1">{item.street_address_en}, {item.address_zip} {item.address_city_en}</p>
											<small className="text-muted text-left">{item.phone}</small>
										</a>
										))}
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
