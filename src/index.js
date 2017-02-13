import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import reducerState from './reducers'
import Application from './components';
import './index.css';

let store = createStore(reducerState);

render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('root')
)
