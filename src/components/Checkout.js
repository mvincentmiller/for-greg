import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import Loading from './General/Loading'
import BillingAddress from './Checkout/BillingAddress'
import Email from './Checkout/Email'
import OrderSummary from './Checkout/OrderSummary'
import PaymentInfo from './Checkout/PaymentInfo'
import ShippingAddress from './Checkout/ShippingAddress'

import CheckoutStore from '../stores/CheckoutStore'

/**
 * Checkout observes ThingStore, CheckoutStore
 *
 * Contains all the relevent components for Checkout
 *
 * Before:
 *  - Loading
 *
 * Durring:
 *  - Email
 *  - ShippingAddress
 *  - BillingAddress
 *  - PaymentInfo
 *  - Order Summary
 *
 */

export const Checkout = observer(() => {
  const store = useContext(CheckoutStore)

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div
        className="container"
        style={{ maxWidth: '1000px', padding: '20px' }}
      >
        <img
          alt="logo"
          style={{ width: '80px', paddingBottom: '20px' }}
          src="https://assets.bulubox.com/assets/bulugroup-logo.png"
        />
        {!store.checkout ||
          (store.processing && (
            <div className="columns">
              <div className="column is-12">
                <div className="box has-text-centered">
                  <Loading />
                </div>
              </div>
            </div>
          ))}
        {store.checkout && !store.processing && (
          <div className="columns">
            <div className="column is-7">
              <Email />
              <ShippingAddress />
              <BillingAddress />
              <PaymentInfo />
            </div>
            <div className="column is-5">
              <OrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  )
})

export default Checkout
