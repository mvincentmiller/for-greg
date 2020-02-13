import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import UiStore from '../../stores/UiStore'
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
 * AKA a good start
 *
 */
//const Notification = observer(props => {})

export const Notify = observer(props => {
  const store = useContext(UiStore)
  //eslint-disable-next-line
  const [remove, setRemoval] = useState(false)
  return (
    <div>
      {store.toast.display && (
        <div className={notificationContainer + ' ' + slideLeft}>
          <div class="notification is-primary">
            <button class="delete" onClick={() => setRemoval(true)}></button>
            {toJS(store.toast.message)}
          </div>
        </div>
      )}
    </div>
  )
})
