import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import CheckoutStore from '../../stores/CheckoutStore'
import { AddressInput } from './AddressInput'
/**
 * BillingAddress observes the CheckoutStore
 *
 * BillingAddress contains many AddressInput fields to comprise
 * a larger billing address. Each Address input is identifed by the
 * `name` peramiter.
 *
 * There is also another bulma box that includes a checkbox for shipping address
 * when un checked a bool is set in the store `sameAsShipping` that then will display
 * a shipping address field when unchecked.
 *
 */
const BillingAddress = observer(() => {
  const store = useContext(CheckoutStore)
  const addressType = 'billingAddress'
  return (
    <div className="box">
      <h2>Billing Address</h2>
      <hr style={{ marginTop: '5px' }} />
      <label>
        <input
          type="checkbox"
          defaultChecked={store.sameAsShipping}
          onClick={() => {
            store.set('sameAsShipping', !store.sameAsShipping)
          }}
        />
        &nbsp;Same as Shipping Address
      </label>

      {!store.sameAsShipping && (
        <div>
          <AddressInput
            AddressObject={addressType}
            name={'name'}
            placeholder={'Name'}
          />
          <AddressInput
            AddressObject={addressType}
            name={'address1'}
            placeholder={'Address'}
          />
          <AddressInput
            AddressObject={addressType}
            name={'address2'}
            placeholder={'Address Line 2'}
          />
          <div className="columns">
            <div className="column is-5">
              <AddressInput
                AddressObject={addressType}
                name={'city'}
                placeholder={'City'}
              />
            </div>
            <div className="column is-4">
              <AddressInput
                AddressObject={addressType}
                name={'state'}
                placeholder={'State'}
              />
            </div>
            <div className="column is-3">
              <AddressInput
                AddressObject={addressType}
                name={'zipcode'}
                placeholder={'Zipcode'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
})

export default BillingAddress
