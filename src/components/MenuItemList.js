import React, { PropTypes } from 'react'
import MenuItem from './MenuItem'

const MenuItemList = ({ places, center, onSelectMenuItem }) => (
  <div className="list-group">
    {places.map(place =>
      <MenuItem
        key={place.id}
        id={place.id}
        item={place}
        selectMenuItem={() => onSelectMenuItem(place)}
      />
    )}
  </div>
)

MenuItemList.propTypes = {
  places: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    name_en: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    address_city_en: PropTypes.string.isRequired,
    address_zip: PropTypes.string.isRequired,
    street_address_en: PropTypes.string.isRequired,
    www_en: PropTypes.string
  }).isRequired).isRequired,
  center: PropTypes.object.isRequired,
  onSelectMenuItem: PropTypes.func.isRequired
}

export default MenuItemList