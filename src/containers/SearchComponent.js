import React, { Component } from 'react'

export default class SearchComponent extends Component {

	render() {
		let input;
		let self = this;

		return (
			<form className="search input-group" onSubmit={e => {
				e.preventDefault();

				if (!input.value.trim()) {
					return
				}
				self.props.onSearch(input.value);
					input.value = '';
				}}>
				<input type="text" className="input form-control" placeholder="Search for an accessible hotel, cafe, bar.." ref={node => {
					input = node
				}} />
				<span className="search-btn input-group-btn">
					<button className="btn btn-secondary" type="submit">Go</button>
				</span>
			</form>
		)
		}
}