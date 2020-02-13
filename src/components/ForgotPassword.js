import React from 'react'
import { observer } from 'mobx-react'
import { NavBar } from './NavBar'
import { ForgotPasswordForm } from './Account/ForgotPasswordForm'

/**
 * ForgotPassword
 *
 * Contains `ForgotPasswordForm` along with other markup
 * (callout, Cancel etc)
 *
 * Also contains a '<Navbar>'
 *
 * Only renderd on route `/forgot-password`
 */
export const ForgotPassword = observer(() => (
  <div className="container has-text-centered">
    <NavBar />
    <div>
      <h1 style={{ fontSize: '36px' }}>Forgot Your Password?</h1>
      <p>
        Enter your email address and we will send you a link to reset your
        password.
      </p>
      <br />
      <ForgotPasswordForm />
      <br />
      <a href="/#/login">Cancel</a>
    </div>
  </div>
))

export default ForgotPassword
