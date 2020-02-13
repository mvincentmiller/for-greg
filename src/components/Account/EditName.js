import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { poochInput } from '../../styles/AccountInfo.module.scss'

/**
 * EditName observes AccountStore
 * Edits Only the name portion of the account edit
 *
 */

export const EditName = observer(props => {
  const store = useContext(AccountStore)

  const handleChange = async event => {
    store.set(event.target.id, event.target.value)
  }

  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
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
    </div>
  )
})
