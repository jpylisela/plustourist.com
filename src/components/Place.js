import React, { PropTypes } from 'react'

const Todo = ({ onClick, completed, text, latitude }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text} {latitude}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  latitude: PropTypes.number.isRequired
}

export default Todo