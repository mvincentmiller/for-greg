import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { toJS } from 'mobx'
import { REACT_APP_STRIPE_KEY } from '../../shop-config'
import {
  CardElement,
  Elements,
  StripeProvider,
  injectStripe,
} from 'react-stripe-elements'

import {
  Link,
  poochInput,
  stripeElementsInput,
} from '../../styles/AccountInfo.module.scss'

/**
 * Edit Card Observes AccountStore
 * Uses Stripe Elements to tokenize the entered card.
 * After Submision the card token is then processed by the `store.updatePaymentBilling`
 * and then the result is returned by `<Notify/>`
 *
 */
const createOptionsElements = () => {
  return [
    {
      cssSrc: 'https://fonts.googleapis.com/css?family=Rubik&display=swap',
    },
  ]
}

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize: '14px',
        color: '#495057',
        backgroundColor: '#fff',
        fontWeight: '400',
        letterSpacing: '0.025em',
        fontFamily: 'Rubik, san-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  }
}

const CardForm = injectStripe(props => {
  const store = useContext(AccountStore)
  const handleSubmit = event => {
    event.preventDefault()
    if (props.stripe) {
      props.stripe.createToken().then(payload =>
        store.updatePaymentBilling(payload).then(() => {
          store.set('renderCardForm', !toJS(store.renderCardForm))
        })
      )
    } else {
      console.log("Stripe.js hasn't loaded yet.")
    }
  }

  const cancel = event => {
    event.preventDefault()
    store.set('renderCardForm', !toJS(store.renderCardForm))
  }
  const handleChange = event => {
    store.set(event.target.id, event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name on Card</label>
      <div className="field-body">
        <div className="field">
          <p className="control">
            <input
              className={'input ' + poochInput}
              type="text"
              id="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <input
              className={'input ' + poochInput}
              type="text"
              id="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </p>
        </div>
      </div>
      <div className="field">
        <label>
          Card Details
          <CardElement
            className={stripeElementsInput}
            {...createOptions(props.fontSize)}
          />
        </label>
      </div>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <button className={Link} onClick={cancel} href="#">
            Cancel
          </button>
        </p>
        <p className="control" style={{ textAlign: 'right' }}>
          <button className="button btn-orange" type="submit">
            Update
          </button>
        </p>
      </div>
    </form>
  )
})

export const EditCard = observer(props => {
  const fontSize = '14px'
  const store = useContext(AccountStore)
  const showForm = event => {
    event.preventDefault()
    store.set('renderCardForm', !toJS(store.renderCardForm))
  }
  if (!toJS(store.renderCardForm)) {
    if (store.customer.billingInfo) {
      return (
        <div>
          <p>{store.customer.billingInfo.name}</p>
          <p>
            {store.customer.billingInfo.cardBrand} ending in{' '}
            {store.customer.billingInfo.cardLast4}
          </p>
          <p>
            Expires{' '}
            {store.customer.billingInfo &&
              store.customer.billingInfo.cardExpMonth}
            /{store.customer.billingInfo.cardExpYear}
          </p>

          <button className="a11y" onClick={showForm}>
            Update Card
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <p>No Billing Address</p>
        </div>
      )
    }
  } else {
    return (
      <div className={stripeElementsInput}>
        <StripeProvider apiKey={REACT_APP_STRIPE_KEY}>
          <Elements fonts={createOptionsElements()}>
            <CardForm fontSize={fontSize} />
          </Elements>
        </StripeProvider>
      </div>
    )
  }
})
