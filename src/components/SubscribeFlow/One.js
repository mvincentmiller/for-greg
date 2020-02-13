import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { SubscribeHeader } from './SubscribeHeader.js'
import { Variants } from './Variants.js'
import { VariantPicker } from './VariantPicker.js'
import { Modal } from '../General/Modal.js'
import UiStore from '../../stores/UiStore.js'

/**
 * This is the first step in the subscribe flow.
 * Contains
 *  - SubscribeHeader
 *  - Modal
 *  - Variants
 *
 */

export const One = observer(props => {
  const uiStore = useContext(UiStore)

  const next = () => {
    uiStore.set('progress', 60)
    window.location.hash = '/subscribe/two'
  }

  return (
    <div className="subscribe">
      <SubscribeHeader />

      <div className="subscribeInner">
        <h1 className="title is-2">Select a plan.</h1>
        <Modal inner={VariantPicker} />
        <div style={{ marginTop: '1em' }}>
          <Variants />
        </div>

        <button
          style={{ marginTop: '2em', marginBottom: '2em' }}
          onClick={next}
          className="button is-primary"
        >
          NEXT
        </button>
        <br />
      </div>
    </div>
  )
})
