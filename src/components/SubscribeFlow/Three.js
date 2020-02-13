import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import UiStore from '../../stores/UiStore'
import { SubscribeHeader } from './SubscribeHeader.js'

/**
 *
 * Three observes the UiStore,
 * Sets the progress bar to zero when directed to checkout
 *
 */

export const Three = observer(props => {
  const uiStore = useContext(UiStore)

  const next = () => {
    uiStore.set('progress', 0)
    window.location.hash = '#/checkout'
  }

  return (
    <div className="subscribe">
      <SubscribeHeader />
      <div className="subscribeInner">
        <h1>Three</h1>
        <button onClick={next} class="button">
          NEXT
        </button>
      </div>
    </div>
  )
})
