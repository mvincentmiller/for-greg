import React from 'react'
import { observer } from 'mobx-react'

import { AddressInput } from './AddressInput'

/**
 * ShippingAddress observes the CheckoutStore
 *
 * ShippingAddress contains many AddressInput fields to comprise
 * a larger shipping address. Each Address input is identifed by the
 * `name` peram.
 *
 */

const ShippingAddress = observer(() => {
  const addressType = 'shippingAddress'

  return (
    <div className="box">
      <h2>Shipping Address</h2>
      <hr style={{ marginTop: '5px' }} />

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
  )
})

export default ShippingAddress
