import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

import logo from './logo.svg';
import './App.scss';

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
    <div className="container-fluid app">
    	<div className="row header">
    		<div className="col-12">
					<img src={logo} className="logo" alt="logo" />
					<h2 className="title">Welcome to Plus Tourist</h2>
    		</div>
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
				</div>
			</div>
    </div>
    );
  }
}

