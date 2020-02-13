import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { poochInput } from '../../styles/AccountInfo.module.scss'

/**
 * EditPassword observes the AccountStore
 * It should not change the state of AccountStore.
 * It should update the password of a user when they are logged in
 * So It may need to be aware of a session
 *
 */

export const EditPassword = observer(props => {
  const store = useContext(AccountStore)
  //console.log(props)

  const [newPassword, setNewPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [renderForm, setRenderForm] = useState(false)

  const validateForm = () => {
    return (
      newPassword === passwordConfirm &&
      newPassword.length !== 0 &&
      passwordConfirm.length !== 0
    )
  }

  const handleChange = event => {
    if (event.target.id === 'editPassword') {
      setNewPassword(event.target.value)
    } else if (event.target.id === 'editPasswordConfirm') {
      setPasswordConfirm(event.target.value)
    } else if (event.target.id === 'changePassword') {
      event.preventDefault()
      setRenderForm(!renderForm)
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await store.setPassword(newPassword)
    setRenderForm(false)
    //window.location.hash = '/';
  }

  return (
    <div>
      {!renderForm && (
        <button className="a11y" onClick={handleChange} id="changePassword">
          {' '}
          Change Password
        </button>
      )}
      {renderForm && (
        <div>
          <div className="field">
            <p className="control">
              <input
                className={'input ' + poochInput}
                type="password"
                id="editPassword"
                placeholder="New Password"
                onChange={handleChange}
              />
            </p>
          </div>
          <div className="field">
            <p className="control">
              <input
                className={'input ' + poochInput}
                type="password"
                id="editPasswordConfirm"
                placeholder="Re-Enter Password"
                onChange={handleChange}
              />
            </p>
            <div />
          </div>
          <div className="field is-grouped">
            <p className="control is-expanded">
              {/* eslint-disable-next-line */}
              <button
                href="#"
                className="button a11y"
                onClick={handleChange}
                id="changePassword"
              >
                Cancel
              </button>
            </p>
            <p className="control">
              <button
                className="button btn-orange"
                disabled={!validateForm()}
                type="submit"
                onClick={handleSubmit}
              >
                Update Password
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  )
})
