import React from 'react'
import { observer } from 'mobx-react'

/**
 * BuyButton
 * A submit button that submits the whole checkout form to the store
 * handled in a higher order component.
 *  */
const BuyButton = observer(() => (
  <div className="has-text-centered">
    <input
      type="submit"
      value="Pay Now"
      className="button is-success"
      style={{ marginBottom: '20px' }}
    />
  </div>
))

export default BuyButton
