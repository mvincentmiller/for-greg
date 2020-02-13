import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import UiStore from '../../stores/UiStore'
import { SubscribeHeader } from './SubscribeHeader.js'
import ThingStore from '../../stores/ThingStore.js'

/**
 * Two observes UiStore, ThingStore
 * This is the second step in the subscribe flow.
 *
 * TODO: Create SubscribeFlowStore etc..
 *
 * */

export const Two = observer(props => {
  const uiStore = useContext(UiStore)
  const store = useContext(ThingStore)
  console.log(store)
  const next = () => {
    uiStore.set('progress', 90)
    window.location.hash = '/checkout?variantId=' + store.variant.id
  }

  const back = () => {
    uiStore.set('progress', 30)
    window.location.hash = '/subscribe/one'
  }

  console.log(store)
  return (
    <div className="subscribe">
      <SubscribeHeader />
      {store.variant && (
        <div className="subscribeInner">
          <h1 className="title is-2">This, right?</h1>

          <p className="subtitle">{store.variant.productTitle}</p>
          <p className="subtitle is-6">Size: {store.variant.variantTitle}</p>

          <button onClick={next} className="button is-primary">
            NEXT
          </button>
        </div>
      )}
      {!store.variant && (
        <div className="subscribeInner">
          <h1 className="title is-2">Oops?</h1>

          <button onClick={back} className="button is-primary">
            BACK
          </button>
        </div>
      )}
    </div>
  )
})
