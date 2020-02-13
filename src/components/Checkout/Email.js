import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import CheckoutStore from '../../stores/CheckoutStore'

/**
 * Email observes the CheckoutStore
 * Simpley sets the email and updates the email
 * on the server via the checkout Mutation.
 */
const Email = observer(() => {
  const store = useContext(CheckoutStore)
  const handleEmail = async event => {
    store.updateEmail(event.target.value)
  }
  return (
    <div className="box">
      <h2>Email</h2>
      <hr style={{ marginTop: '5px' }} />
      <input
        className="input"
        type="email"
        id="email"
        placeholder="Email"
        defaultValue={store.checkout.email}
        onBlur={handleEmail}
      />
    </div>
  )
})

export default Email
