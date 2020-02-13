import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import {
  accountNav,
  accountNavItem,
  accountNavList,
  navLink,
  active,
} from '../../styles/AccountNav.module.scss'
/**
 * Account nav displays on the right
 * side of the account page on Desktop.
 * The Nav on mobile is a hidden accordian style component
 */

export const AccountNav = observer(props => {
  const store = useContext(AccountStore)

  const handleClick = event => {
    event.preventDefault()
    store.set('accountTab', event.target.name)
  }
  return (
    <div className={'box ' + accountNav}>
      <ul className={accountNavList}>
        <li className={accountNavItem}>
          <button
            onClick={handleClick}
            name="#mySubscriptions"
            className={
              'a11y ' +
              navLink +
              ' ' +
              (store.accountTab === '#mySubscriptions' ? active : '')
            }
          >
            My Subscriptions
          </button>
        </li>
        <li className={accountNavItem}>
          <button
            onClick={handleClick}
            name="#myOrders"
            className={
              'a11y ' +
              navLink +
              ' ' +
              (store.accountTab === '#myOrders' ? active : '')
            }
          >
            My Orders
          </button>
        </li>
        <li className={accountNavItem}>
          <button
            onClick={handleClick}
            name="#accountInfo"
            className={
              'a11y ' +
              navLink +
              ' ' +
              (store.accountTab === '#accountInfo' ? active : '')
            }
          >
            Account Info
          </button>
        </li>
      </ul>
    </div>
  )
})
