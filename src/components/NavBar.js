import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../stores/AccountStore'

import { navItem } from '../styles/NavBar.module.scss'
import PropTypes from 'prop-types'
/**
 * NavBarItem
 * Renders a navbar item from props
 * - props.image
 * - props.href
 * - props.text
 * - props.onClick
 */
const NavBarItem = props => (
  <a
    style={{
      minHeight: '80px',
    }}
    className={'navbar-item ' + navItem}
    href={props.href}
    onClick={props.onClick}
  >
    {props.image && (
      <img
        alt="navigation"
        src={props.image}
        style={{ width: 'auto', maxHeight: '53px' }}
      />
    )}
    {props.text}
  </a>
)

NavBarItem.propTypes = {
  href: PropTypes.string,
  onClick: PropTypes.func,
  image: PropTypes.string,
  text: PropTypes.string,
}

/**
 * Navbar observes AccountStore
 * Renders each navbar item insidea bluma.io navbar
 * It also handles logic for logined in and logedout states
 *
 * Will colapse into a burger / logo when in mobile mode
 */
export const NavBar = observer(props => {
  const store = useContext(AccountStore)

  const [burgerActive, setBurgerActive] = useState(false)

  const logOut = event => {
    event.preventDefault()
    store.clearSession()
  }
  ///https:///assets.bulubox.com/assets/bulugroup-logo.png
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ maxWidth: '1344px', margin: 'auto' }}
    >
      <div className="navbar-brand">
        <NavBarItem
          image={'http://cdn.onlinewebfonts.com/svg/img_547.png'}
          href="#"
        />
      </div>

      <button
        className={'a11y navbar-burger ' + (burgerActive ? 'is-active' : '')}
        aria-label="menu"
        aria-expanded="false"
        onClick={() => {
          setBurgerActive(!burgerActive)
        }}
        style={{
          position: 'absolute',
          zIndex: 1001,
          top: 0,
          right: 0,
        }}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>
      <div
        style={{
          position: 'relative',
          top: '-4px',
          textAlign: 'center',
        }}
        className={'navbar-menu ' + (burgerActive ? 'is-active' : '')}
      >
        <div className="navbar-end">
          <NavBarItem text="Subscribe" href="#/" />
          <NavBarItem text="FAQ" href="#/faq" />
          {!store.customerToken && <NavBarItem text="Log In" href="#/login" />}
          {store.customerToken && (
            <NavBarItem text="Log Out" onClick={logOut} />
          )}
          {store.customerToken && (
            <NavBarItem text="My Account" href="#/myaccount" />
          )}
        </div>
      </div>
    </nav>
  )
})

export default NavBar
