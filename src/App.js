import React, {Component} from 'react';
import GoogleMap from 'google-map-react';

import title from './plus-tourist.png';
import logo from './logo.png';
import './App.scss';

export default class SimpleMapPage extends Component {
  static defaultProps = {
    center: {lat: 60.170, lng: 24.970},
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
    		<div className="col-3 brand">
					<img src={logo} className="logo" alt="logo" />
					<h2 className="title hidden-md-down">
						<img src={title} className="title" alt="Plus Tourist" />
					</h2>
    		</div>
    		<div className="col-6">
    			<div className="search input-group">
	    			<input type="text" className="input form-control" placeholder="Search for..." />
	    			<span className="search-btn input-group-btn">
	    				<button className="btn btn-secondary" type="button">Go</button>
	    			</span>
    			</div>
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
						<div className="col-12">

							<div className="list-group">
								<a href="#" className="list-group-item list-group-item-action flex-column align-items-start active">
									<div className="d-flex w-100 justify-content-between">
										<h5 className="mb-1">List group item heading</h5>
										<small>3 days ago</small>
									</div>
									<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
									<small>Donec id elit non mi porta.</small>
								</a>
								<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
									<div className="d-flex w-100 justify-content-between">
									<h5 className="mb-1">List group item heading</h5>
									<small className="text-muted">3 days ago</small>
									</div>
									<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
									<small className="text-muted">Donec id elit non mi porta.</small>
								</a>
								<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
									<div className="d-flex w-100 justify-content-between">
										<h5 className="mb-1">List group item heading</h5>
										<small className="text-muted">3 days ago</small>
									</div>
									<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
									<small className="text-muted">Donec id elit non mi porta.</small>
								</a>
								<a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
									<div className="d-flex w-100 justify-content-between">
										<h5 className="mb-1">List group item heading</h5>
										<small className="text-muted">3 days ago</small>
									</div>
									<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
									<small className="text-muted">Donec id elit non mi porta.</small>
								</a>
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

