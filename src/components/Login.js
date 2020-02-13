import React from 'react'
import { observer } from 'mobx-react'
import { NavBar } from './NavBar'
import { Footer } from './Footer.js'
import { LoginForm } from './Account/LoginForm'

/**
 * Login
 * Contains the component <LoginForm/>.
 * Is only returned on route /login
 */

export const Login = observer(() => (
  <div>
    <div className="container has-text-centered loginContainer">
      <NavBar />
      <div>
        <h1 style={{ fontSize: '36px' }}>Login to Your Account</h1>
        <br />
        <LoginForm />
        <br />
        <a href="/#/forgot-password">Forgot Your Password?</a>
      </div>
    </div>
    <Footer />
  </div>
))
