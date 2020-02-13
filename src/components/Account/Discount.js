import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { poochInput, Link } from '../../styles/AccountInfo.module.scss'

/**
 * Adds a discount to an existing subscription.
 * Renders the form when `Add A Discount` is clicked
 * Submit's a code via `store.addDiscount` and returns the result via a `<Notify/>` message.
 */

export const Discount = observer(props => {
  const store = useContext(AccountStore)
  const [render, setRender] = useState(false)

  const handleChange = async event => {
    store.set(event.target.id, event.target.value)
  }

  const showhide = async event => {
    event.preventDefault()
    setRender(!render)
  }

  const AddDiscount = async event => {
    event.preventDefault()
    store.addDiscount(props.s.id, store.discountCode)
  }
  if (!render) {
    return (
      <div>
        <button className="button is-primary is-link" onClick={showhide}>
          Add A Discount
        </button>
      </div>
    )
  } else {
    return (
      <div style={{ maxWidth: '400px' }}>
        <div className="field">
          <p className="control">
            <input
              className={'input ' + poochInput}
              type="text"
              id="discountCode"
              placeholder="Discount Code"
              onChange={handleChange}
            />
          </p>
        </div>
        <div className="field is-grouped">
          <p className="control is-expanded">
            <button className={Link} onClick={showhide} href="">
              Cancel
            </button>
          </p>
          <p className="control" style={{ textAlign: 'right' }}>
            <button
              className="button btn-orange"
              type="submit"
              onClick={AddDiscount}
            >
              Add A Discount
            </button>
          </p>
        </div>
      </div>
    )
  }
})
