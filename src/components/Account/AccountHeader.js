import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import AccountStore from '../../stores/AccountStore'
import {
  AccountHeaderStyle,
  underline,
} from '../../styles/AccountHeader.module.scss'

/**
 * Account Header
 * This component Displays the user's name in a freindly way.
 *
 */

export const AccountHeader = observer(props => {
  const store = useContext(AccountStore)
  if (store.customer) {
    var customerName = toJS(store.customer).name.split(' ')[0]
  }
  return (
    <div className={AccountHeaderStyle}>
      <h1>
        Welcome back,{' '}
        <span className={underline}>{store.customer && customerName}</span>
      </h1>
    </div>
  )
})
