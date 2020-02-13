import React from 'react'
//import spinner from '../spinner.gif';
//import { observer } from 'mobx-react'

/**
 * Confirm
 * Is displayed on success of checkout
 * thanking the user. It Includes links for other redirects.
 * It could linlude other things like upsells and other offers.
 */
export const Confirm = () => {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">Thanks For your order!</h1>
          <h2 className="subtitle">
            Your order is now being processed and will be in your account
            shortly!
          </h2>
          <h2>
            Go to{' '}
            <a className="is-primary" href="#/login">
              your account
            </a>{' '}
            or add another{' '}
            <a className="is-primary" href="#/subscribe/one">
              subscription
            </a>
          </h2>
        </div>
      </div>
    </section>
  )
}
