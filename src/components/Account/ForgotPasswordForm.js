import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'

/**
 * ForgotPasswordForm observes AccountStore
 * It calls the `store.recover(email)` to send a password recovery email to the user.
 *
 */
export const ForgotPasswordForm = observer(props => {
  const store = useContext(AccountStore)

  const [email, setEmail] = useState('')
  const [complete, setComplete] = useState(false)

  const handleSubmit = async event => {
    event.preventDefault()
    console.log(email)
    await store.recover(email)
    setComplete(true)
    setTimeout(() => {
      setComplete(false)
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      {complete && (
        <p className="is-info" style={{ marginBottom: '10px' }}>
          A password reset email has been sent to {email}
        </p>
      )}
      <div className="field">
        <input
          className="input"
          type="email"
          id="recoveryEmail"
          placeholder="Email"
          onChange={event => {
            setEmail(event.target.value)
          }}
        />
      </div>
      <div className="field">
        <input
          className="button is-info"
          type="submit"
          value="Recover Account"
        />
      </div>
    </form>
  )
})
