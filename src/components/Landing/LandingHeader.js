/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from 'react'
import { observer } from 'mobx-react'

import { NavBar } from '../NavBar'

import PropTypes from 'prop-types'
import { copy } from '../../stores/copy.js'

/**
 * LandingCallout
 *
 * Contains the text for landing header, passed in via props.
 */

const LandingCallout = props => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '8em',
        zIndex: '1',
        textAlign: 'center',
        backgroundColor: '#171717',
        padding: '2em',
        width: '60%',
      }}
    >
      <div className="callout">
        <h1>{props.title}</h1>
        <h3 className="welcome-message">{copy.landingMessage}</h3>
        <button
          className="button is-primary"
          onClick={() => (window.location.hash = '/subscribe/one')}
        >
          3 EASY STEPS
        </button>
      </div>
    </div>
  )
}
LandingCallout.propTypes = {
  title: PropTypes.string,
}
/**
 * LandingHeader
 *
 * This is the header and nav for the landing- it may hold an image carousel or a video player, etc.
 *
 */

export const LandingHeader = observer(props => (
  <div
    className="landingHeader"
    style={{
      minHeight: '65vh',
    }}
  >
    {/* 
    <LandingCallout title={props.title} />
    <VideoBanner />

  */}
    <div className="navtop">
      <NavBar />
    </div>
  </div>
))
