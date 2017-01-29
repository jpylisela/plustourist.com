
import { combineReducers } from 'redux'
import center from './center'
import loading from './loading'
import places from './places'
import selected from './selected'
import term from './term'
import transition from './transition'
import zoom from './zoom'

const reducerState = combineReducers({
	center,
	loading,
	places,
	selected,
	term,
	transition,
	zoom
})

export default reducerState