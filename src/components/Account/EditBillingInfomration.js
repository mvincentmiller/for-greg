import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import AccountStore from '../../stores/AccountStore'
import states from '../../states.json'
import {
  accountSubSectionHeader,
  Link,
  poochInput,
} from '../../styles/AccountInfo.module.scss'

/**
 * EditBilling Observes AccountStore
 * When `Billing Address` is clicked EditBilling revieals a form
 * that updates the billing address when submited. `store.updateBilling()` is called
 * and a `<Notify/>` message is returned on a result.
 *
 */

export const EditBilling = observer(props => {
  const store = useContext(AccountStore)
  const [renderBilling, setRenderBillling] = useState(false)

  //state
  const showForm = event => {
    event.preventDefault()
    setRenderBillling(!renderBilling)
  }

  const handleChange = event => {
    store.set(event.target.id, event.target.value)
  }
  const updateBilling = async event => {
    await store.updateBilling()
    setRenderBillling(!renderBilling)
  }

  if (!renderBilling) {
    return (
      <div>
        <p className={accountSubSectionHeader}>Billing Address</p>
        {console.log(store.customer)}
        {store.customer && (
          <span>
            <p>{toJS(store.customer.billingInfo.name)}</p>
            <p>{toJS(store.customer.billingInfo.address1)}</p>
            <p>{toJS(store.customer.billingInfo.address2)}</p>
            <p>
              {toJS(store.customer.billingInfo.city)}{' '}
              {toJS(store.customer.billingInfo.state)}{' '}
              {toJS(store.customer.billingInfo.zipcode)}
            </p>
          </span>
        )}
        {/*eslint-disable-next-line*/}
        <a className={Link} onClick={showForm} href="">
          Edit Billing Address
        </a>
      </div>
    )
  } else {
    return (
      <div>
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
              onClick={updateBilling}
            >
              Update Billing
            </button>
          </p>
        </div>
      </div>
    )
  }
})
