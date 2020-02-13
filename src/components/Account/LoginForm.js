import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'

import AccountStore from '../../stores/AccountStore'

/**
 * LoginForm observes AccountStore
 * LoginForm has it's own state for error, email, password fields.
 * Once all error states are met users will hit the login button and call `store.login()`
 * to access their account.
 *
 */

export const LoginForm = observer(() => {
  const store = useContext(AccountStore)

  const [error, setError] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async event => {
    event.preventDefault()
    if (email.length > 0 && password.length > 0) {
      const auth = await store.login(email, password)
      if (auth) {
        window.location.hash = '/myaccount'
      }
    }
    setError(true)
    setTimeout(() => {
      setError(false)
    }, 3000)
  }

  return (
    <form onSubmit={login} style={{ maxWidth: '400px', margin: 'auto' }}>
      {error && (
        <p className="has-text-danger" style={{ marginBottom: '15px' }}>
          Invalid Email or Password
        </p>
      )}
      <div className="field">
        <input
          className="input"
          type="email"
          id="email"
          placeholder="Enter Email Address"
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div className="field">
        <input
          className="input"
          type="password"
          id="password"
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <input type="submit" value="Login" className="button is-info" />
    </form>
  )
})

export default LoginForm
