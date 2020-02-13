import React from 'react'
import PropTypes from 'prop-types'
/**
 * A simple loading weel
 * Renders a simple loading.gif from a CDN
 *
 */
export const Loading = props => (
  <div className="has-text-centered">
    <h1>One moment...</h1>
    <img
      alt="loading"
      style={{ width: '120px', margin: '40px' }}
      src={
        props.imageUrl
          ? props.imageUrl
          : 'https://assets.bulubox.com/loading.gif'
      }
    />
  </div>
)
Loading.propTypes = {
  imageUrl: PropTypes.string,
}

export default Loading
