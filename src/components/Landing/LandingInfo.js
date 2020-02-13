import React from 'react'
import { observer } from 'mobx-react'

/**
 * This is a content area on the landing route.
 * Contains a few box images and copy. Should be refactored to be more dynamic.
 *
 */

export const LandingInfo = observer(props => {
  return (
    <div className="box" style={{ padding: '3em' }}>
      <div className="columns">
        <div className="column">
          <h1 className="title">BRIDGE ONLINE & OFFLINE COMMUNITIES</h1>
          <p>
            Keep your in-store customers up-to-date by sending key pieces from
            each season’s collection. Customers can try products from the
            comfort of their home, discover what they like and stop by your
            store for more.
          </p>
          <h1 style={{ marginTop: '2em' }} className="title">
            CREATE A RECURRING REVENUE STREAM
          </h1>
          <p>
            Diversify your e-commerce platform while adding recurring revenue
            you can count on. Subscription Boxes provide an opportunity for your
            products to land in customer’s hands, while watching your cash flow
            grow.
          </p>
        </div>
        <div className="column">
          <figure className="image is-square">
            <img alt="bridge-across-water" src="bridge.jpg" />
          </figure>
        </div>
      </div>
    </div>
  )
})
