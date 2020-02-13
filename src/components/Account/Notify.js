import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import AccountStore from '../../stores/AccountStore'
import {
  slideLeft,
  notificationContainer,
} from '../../styles/Notify.module.scss'

/**
 * Notify observes the AccountStore
 *
 *
 * Notify is a toast like component completely built with
 * React and bluma.io
 * It includes a basic fly in animation
 * Call pushNotification() on `AccountStore` to activate `<Notify/>
 *
 */

export const Notify = observer(props => {
  const store = useContext(AccountStore)
  return (
    <div>
      {store.toast.display && (
        <div className={notificationContainer + ' ' + slideLeft}>
          <div className={'notification is-' + store.toast.color}>
            <button
              className="delete"
              onClick={() => store.showHideNotification(false)}
            ></button>
            {toJS(store.toast.message)}
          </div>
        </div>
      )}
    </div>
  )
})
