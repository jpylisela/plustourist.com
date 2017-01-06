import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

import logo from './logo.svg';
// import MyGreatPlace from './my_great_place.jsx';

import './App.css';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 60.170, lng: 24.935},
    zoom: 13,
    greatPlaceCoords: {lat: 60.170, lng: 24.935}
  };

  constructor(props) {
  	console.log(props);
    super(props);
  }

  render() {
    return (
		<div className="app">
			<img src={logo} className="logo" alt="logo" />
			<h2 className="title">Welcome to Plus Tourist</h2>
			<div className="map-container">
				<GoogleMap
					bootstrapURLKeys={{
						key: 'AIzaSyBASoIltUYEdmuTOs_x0ssvJHkoYTdtPvQ',
						language: 'en'
					}}
					defaultCenter={this.props.center}
					defaultZoom={this.props.zoom}>
				</GoogleMap>
			</div>
		</div>
    );
  }
}

