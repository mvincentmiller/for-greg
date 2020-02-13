import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import {
  accountNavMobile,
  accountNavMobileItem,
  accountNavMobileList,
  navLink,
  active,
  mobileAccountheader,
  arrowActive,
  arrowInActive,
} from '../../styles/AccountNavMobile.module.scss'

/**
 * Account nav displays on the right
 * side of the account page on Desktop.
 * The Nav on mobile is a hidden accordian style component
 */

export const AccountNavMobile = observer(props => {
  const store = useContext(AccountStore)
  const [expanded, setExpanded] = useState(false)
  const handleClick = event => {
    if (event.target.name === 'mobileNavheader') {
      setExpanded(!expanded)
    } else {
      store.set('accountTab', event.target.name)
      setExpanded(false)
    }
  }

  return (
    <div className={accountNavMobile}>
      <div className={mobileAccountheader}>
        <button className="a11y" onClick={handleClick} name="mobileNavheader">
          {store.accountTab === '#mySubscriptions' && 'My Subscriptions'}
          {store.accountTab === '#myOrders' && 'My Orders'}
          {store.accountTab === '#accountInfo' && 'Account Info'}
          <img
            className={expanded === true ? arrowActive : arrowInActive}
            src="https://s3.amazonaws.com/assets.bulubox.com/assets/pp_temp/chevron.svg"
            name="mobileNavheader"
            alt="moblieArrow"
          />
        </button>
      </div>
      <ul className={accountNavMobileList}>
        {expanded === true && store.accountTab !== '#mySubscriptions' && (
          <li className={accountNavMobileItem} id="mySubscriptionsButton">
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
        )}
        {expanded === true && store.accountTab !== '#myOrders' && (
          <li className={accountNavMobileItem} id="myOrdersButton">
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
        )}
        {expanded === true && store.accountTab !== '#accountInfo' && (
          <li className={accountNavMobileItem} id="accountInfoButton">
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
        )}
      </ul>
    </div>
  )
})
