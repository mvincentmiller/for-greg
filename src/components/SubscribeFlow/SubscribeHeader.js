import React from 'react'
import { observer } from 'mobx-react'
import { ProgressBar } from './ProgressBar'

/**
 * SubscribeHeader holds the progress bar.
 * TODO: Should update ProgressBar baised on route or something.
 */

export const SubscribeHeader = observer(props => {
  return (
    <div>
      <div
        style={{
          margin: '0 auto',
          marginTop: '2em',
          marginBottom: '2em',
          width: '150px',
          textAlign: 'center',
          background: '#fcfcfc',
        }}
      >
        <img
          onClick={() => (window.location.hash = '/')}
          alt="logo"
          src="https://s3.amazonaws.com/assets.bulubox.com/assets/bulugroup-logo.png"
          style={{ width: '50px', margin: '0 auto', maxHeight: '53px' }}
        />
      </div>
      <ProgressBar progress="10" />
    </div>
  )
})
