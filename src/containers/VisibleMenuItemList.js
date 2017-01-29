import { connect } from 'react-redux'
import { setActiveFilter, calculateTransition } from '../actions'
import MenuItemList from '../components/MenuItemList'

const mapStateToProps = (state, ownProps) => {
	return {
		places: state.places,
		center: ownProps.center
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {

  // Can optionally extract the action into actions/index.js
  return {
    onSelectMenuItem: (item) => {

    	let args = {
    		item: item,
    		center: ownProps.center
    	};

      	dispatch(calculateTransition(ownProps, args));
      	dispatch(setActiveFilter(ownProps, args));
    }
  }
}

const VisibleMenuItemList = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuItemList)

export default VisibleMenuItemList