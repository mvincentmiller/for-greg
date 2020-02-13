import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'

import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements'

import BuyButton from './BuyButton'
import CheckoutStore from '../../stores/CheckoutStore'
import { REACT_APP_STRIPE_KEY } from '../../shop-config'
console.log(REACT_APP_STRIPE_KEY)

/**
 * CardForm Observes the CheckoutStore
 *
 * CardForm Renders the CardElement (StripeElements)
 * and the BuyButton. Contains the form that the `BuyButton` submits.
 */
const CardForm = observer(
  injectStripe(props => {
    const store = useContext(CheckoutStore)

    const onSubmit = event => {
      event.preventDefault()
      if (props.stripe) {
        props.stripe.createToken().then(response => {
          if (response.token) {
            store.checkoutProcess(response.token.id)
          }
        })
      }
    }

    return (
      <form onSubmit={onSubmit}>
        <div className="box">
          <h2>Payment Info</h2>
          <hr style={{ marginTop: '5px' }} />
          <CardElement />
        </div>
        <BuyButton />
      </form>
    )
  })
)

const PaymentInfo = () => {
  const [stripe, setStripe] = useState(null)
  useEffect(() => {
    if (window.Stripe) {
      setStripe(window.Stripe(REACT_APP_STRIPE_KEY))
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        // Create Stripe instance once Stripe.js loads
        setStripe(window.Stripe(REACT_APP_STRIPE_KEY))
      })
    }
  }, [])
  if (stripe === null) {
    return <p>Loading Stripe...</p>
  } else {
    return (
      <StripeProvider stripe={stripe}>
        <Elements>
          <CardForm stripe={stripe} />
        </Elements>
      </StripeProvider>
    )
  }
}

export default PaymentInfo
