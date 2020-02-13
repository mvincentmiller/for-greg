import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { poochInput } from '../../styles/AccountInfo.module.scss'

/**
 * Edits email and also updates the rest of the fields
 * Field that updates the email field.
 *
 */

export const EditEmail = observer(props => {
  const store = useContext(AccountStore)

  const handleChange = async event => {
    store.set(event.target.id, event.target.value)
  }

  return (
    <div className="field">
      <p className="control">
        <input
          className={'input ' + poochInput}
          type="text"
          id="newEmail"
          placeholder="Email"
          onChange={handleChange}
        />
      </p>
    </div>
  )
})
