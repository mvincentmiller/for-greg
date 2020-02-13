import React from 'react'
import { observer } from 'mobx-react'
import { NavBar } from './NavBar'
import { ResetPassword } from './Account/ResetPassword'

/**
 * ResetPasswordView
 *
 * Contains the <ResetPasswrd/> component from /Account
 * Renders this along with the NavBar
 *
 * Returned on `/reset-password`
 */
export const ResetPasswordView = observer(() => (
  <div className="container has-text-centered">
    <NavBar />
    <div>
      <h1 style={{ fontSize: '36px' }}>Reset Your Password</h1>
      <br />
      <ResetPassword />
      <br />
    </div>
  </div>
))
