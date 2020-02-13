import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'

import CheckoutStore from '../../stores/CheckoutStore'

/**
 * Discount Code observes the CheckoutStore
 *
 * Adds a Discount Code to the current checkout.
 */
const DiscountCode = observer(() => {
  const store = useContext(CheckoutStore)

  const [discountCode, setDiscount] = useState('')

  const onClick = () => {
    store.updateDiscountCode(discountCode)
  }

  return (
    <div>
      <h3 style={{ marginBottom: '10px' }}>
        Have a Discount Code? Enter it here!
      </h3>
      {store.errors !== null && store.errors.indexOf('discount') !== -1 && (
        <p
          className="has-text-danger"
          style={{ fontSize: '14px', marginBottom: '10px' }}
        >
          Discount not found
        </p>
      )}
      <div className="columns">
        <div className="column is-8">
          <input
            className="input"
            name="discountCode"
            onBlur={() => {}}
            placeholder="Discount Code"
            defaultValue={discountCode}
            onChange={event => {
              setDiscount(event.target.value)
            }}
          />
        </div>
        <div className="column is-4">
          <input
            type="submit"
            className="button is-info"
            style={{ minWidth: '100%', maxWidth: '100%' }}
            value="Apply"
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  )
})

export default DiscountCode
