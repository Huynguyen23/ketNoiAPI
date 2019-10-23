import React from 'react'
import PropTypes from 'prop-types'

const Square = ({ onClick, win, value }) => {
  return (
    <button className={win ? "square square-highlight" : "square"} onClick={onClick}>
      {value}
    </button>
  )
}

Square.propTypes = {
  onClick: PropTypes.func.isRequired,
  win: PropTypes.bool.isRequired,
  value: PropTypes.string
}

export default Square
