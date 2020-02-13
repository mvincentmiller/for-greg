import React from 'react'
// import { observer } from 'mobx-react'
import { NavBar } from '../NavBar'

/**
 * Error
 *
 * Displays a pre formated 404 page that has a cute picture.
 */
export const Error = () => {
  return (
    <div>
      <NavBar style={{ position: 'fixed' }} />
      <section className="hero ohnoes">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 className="title">Oh noes!</h1>
            <h2 className="subtitle">
              There was a problem with your request. Please contact customer
              support.
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
    </div>
  )
}
