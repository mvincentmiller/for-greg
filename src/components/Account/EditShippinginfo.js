import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import states from '../../states.json'
import { Link, poochInput } from '../../styles/AccountInfo.module.scss'

/**
 * EditShipping Observes AccountStore
 * Updates the Subscription's Shipping address.
 * Displays a <Notify/> notification when updated.
 *
 */

export const EditShipping = observer(props => {
  const store = useContext(AccountStore)
  const [renderBilling, setRenderBillling] = useState(false)
  const showForm = event => {
    event.preventDefault()
    setRenderBillling(!renderBilling)
  }

  const handleChange = event => {
    store.set(event.target.id, event.target.value)
  }

  if (!renderBilling) {
    return (
      <div>
        <button className={'a11y ' + Link} onClick={showForm}>
          Edit Shipping Address
        </button>
      </div>
    )
  } else {
    return (
      <div style={{ fontWeight: 400 }}>
        <div className="field-body" style={{ marginBottom: '.5rem' }}>
          <div className="field">
            <p className="control">
              <lable>First Name</lable>
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
              <lable>Last Name</lable>
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
          <p className="control">
            <lable>Address 1</lable>
            <input
              className={'input ' + poochInput}
              type="text"
              id="address1"
              placeholder="Address 1"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field">
          <lable>Address 2</lable>
          <p className="control">
            <input
              className={'input ' + poochInput}
              type="text"
              id="address2"
              placeholder="Address 2"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field-body">
          <div className="field">
            <p className="control">
              <lable>State</lable>
              <select
                className={poochInput}
                id="state"
                placeholder="State"
                onChange={handleChange}
                style={{ height: '54px' }}
              >
                {states.map(state => (
                  <option value={state.abbreviation} key={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
            </p>
          </div>
          <div className="field">
            <lable>City</lable>
            <p className="control">
              <input
                className={'input ' + poochInput}
                type="text"
                id="city"
                placeholder="City"
                onChange={handleChange}
              />
            </p>
          </div>
        </div>
        <div className="field">
          <p className="control">
            <lable>Zip</lable>
            <input
              className={'input ' + poochInput}
              type="zip"
              id="zip"
              placeholder="Zip"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <button className={Link} onClick={showForm} href="">
              Cancel
            </button>
          </p>
          <p className="control" style={{ textAlign: 'right' }}>
            <button
              className="button btn-orange"
              type="submit"
              onClick={async () => {
                await store.updateSubscriptionAddress(props.sub)
                setRenderBillling(!renderBilling)
              }}
            >
              Update Shipping Address
            </button>
          </p>
        </div>
      </div>
    )
  }
})
