import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import ThingStore from '../../stores/ThingStore.js'

/**
 * VariantPicker observes ThingStore
 *
 * Changes the variant metadatan (size) and sends that to the ThingStore.
 */
export const VariantPicker = observer(() => {
  const store = useContext(ThingStore)

  const handleChange = event => {
    store.set('variantTitle', event.target.value)
  }

  return (
    <div
      style={{
        maxWidth: '90%',
        margin: '0 auto',
        textAlign: 'left',
        padding: '1em',
      }}
    >
      <div class="columns">
        <div className="column">
          <form action="#">
            <p> Small</p>
            <input
              onChange={handleChange}
              value="S"
              type="radio"
              id="test1"
              name="radio-group"
            />
            <label htmlFor="test1">S</label>
            <hr />
            <p> Medium </p>
            <input
              onChange={handleChange}
              value="M"
              type="radio"
              id="test2"
              name="radio-group"
            />
            <label htmlFor="test2">M</label>
            <hr />
            <p> Large </p>
            <input
              onChange={handleChange}
              value="L"
              type="radio"
              id="test3"
              name="radio-group"
            />
            <label htmlFor="test3">L</label>
            <hr />
          </form>
        </div>

        <div className="column">
          <img
            alt="alt"
            src="https://i.stack.imgur.com/yZlqh.png"
            style={{ maxWidth: '350px' }}
          />
        </div>
      </div>
    </div>
  )
})
