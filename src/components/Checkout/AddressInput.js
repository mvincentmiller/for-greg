import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import CheckoutStore from '../../stores/CheckoutStore'
/**
 * AddressInput observes the CheckoutStore
 *
 * AddressInput takes user input and then updates the billing address first
 * on the store then it runs the funciton `store.updateAddress()` that then
 * calls a mutation on the server.
 */
export const AddressInput = observer(props => {
  const store = useContext(CheckoutStore)
  return (
    <div className="field">
      <input
        className="input"
        type="text"
        id={props.name}
        placeholder={props.placeholder}
        defaultValue={
          store[props.AddressObject] && store[props.AddressObject][props.name]
        }
        onBlur={event => {
          store[props.AddressObject].set(props.name, event.target.value)
          store.updateAddress()
        }}
      />
    </div>
  )
})
