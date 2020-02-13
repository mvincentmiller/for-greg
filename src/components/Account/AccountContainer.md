```jsx
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import AccountStore from '../../stores/AccountStore'
import { Footer } from '../Footer'
import { NavBar } from '../NavBar'
import { AccountHeader } from './AccountHeader'
import { AccountNav } from './AccountNav'
import { Subscriptions } from './Subscriptions'

import { OrderList } from './OrderList'
import { container, columnRight } from '../../styles/MyAccount.module.scss'
import { pageHeader } from '../../styles/Subscription.module.scss'
import { AccountInfo } from './AccountInfo'
import { Notify } from './Notify'
/**
 * AccountContainer serves as the global container for all Account related components.
 * It is the entry point when a user logs into their account.
 *
 * Inside the AccountContainer Return statement we have
 *
 *   <Notify/>
 *   <NavBar/>
 *   <AccountNav/>
 *   <Subscriptions/>
 *   <OrderList/>
 *   <AccountInfo/>
 *   <Footer/>
 *
 *   Many of these components have unique function that are discused inside each's respective doc string
 *   Most are local only to this component `AccountContainer` however some like `Footer` and `Navbar` are used throughout the application.
 *
 */

const AccountContainerExample = observer(props => {
  const store = useContext(AccountStore)
  console.log(store)
  return (
    <div>
      <Notify />
      <NavBar />
      <AccountHeader />
      <div className={container}>
        <div class="columns">
          <div className="column is-3">
            <AccountNav />
          </div>
          <div className={'column is-9 ' + columnRight}>
            {store.accountTab === '#mySubscriptions' && (
              <div>
                <h2 className={pageHeader}>My Subscriptions</h2>
                <div className="columns">
                  <Subscriptions />
                </div>
              </div>
            )}
            {store.accountTab === '#myOrders' && (
              <div>
                <OrderList boxes={toJS(store.boxes)} />
              </div>
            )}
            {store.accountTab === '#accountInfo' && (
              <div>
                <AccountInfo />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
})
;<AccountContainerExample />
```
