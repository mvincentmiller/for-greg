import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import AccountStore from '../../stores/AccountStore'
import { Discount } from './Discount'
import {
  subscriptionHeader,
  subscriptionDetails,
  boxImage,
  subscriptionContainer,
} from '../../styles/Subscription.module.scss'
import { EditShipping } from './EditShippinginfo'
import { CancelSubscription } from './CancelSubscription'
import { Skip } from './SkipSubscription'

/**
 * Subscriptions observers and modifys AccountStore
 * Subscriptions contains the markup for the subscription data itself.
 * It also contains sub components that provide other function.
 *   - <CancelSubscription s={s} />
 *   - <Skip s={s} />
 *   - <EditShipping sub={s} />
 *   - <Discount s={s} />
 *
 * They all accept a discrite subscription object that is passed in as a prop s.
 * This is used as a index to modify the subscriptions object on the store.
 */
const green = {
  color: 'green',
}
const red = {
  color: 'red',
}

export const Subscriptions = observer(props => {
  const store = useContext(AccountStore)
  let subs = toJS(store.subscriptions)
  console.log(subs)
  return (
    <div className={subscriptionContainer}>
      {subs &&
        [...store.subscriptions.values()].map(s => {
          console.log(s)
          return (
            <div className="box">
              <div className="columns">
                <div className="column is-4">
                  <img
                    className={boxImage}
                    alt="box"
                    src={store.variants.get(s.sku).image}
                  />
                </div>
                <div className="column is-8">
                  <h3 className={subscriptionHeader}>
                    {store.variants.get(s.sku).productTitle}
                  </h3>
                  <p className={subscriptionDetails}>
                    {s.title && toJS(s.title).slice(10)}
                  </p>
                  <br />
                  <p className={subscriptionDetails}>
                    Subscription Status:{' '}
                    <span
                      style={s && toJS(s.status) === 'ACTIVE' ? green : red}
                    >
                      {s && s.status}
                    </span>
                  </p>
                  <p className={subscriptionDetails}>
                    Next Billing Date: {s.nextCharge}
                  </p>
                  <br />
                  <p className={subscriptionDetails}>
                    Shipping Address:{' '}
                    <span className="light">
                      {s.address && s.address.address1}{' '}
                      {s.address && s.address.address2},{' '}
                      {s.address && s.address.city},{' '}
                      {s.address && s.address.state},{' '}
                      {s.address && s.address.zipcode}
                    </span>
                    <br />
                  </p>
                  <br />
                  <CancelSubscription s={s} />
                  <Skip s={s} />
                  <EditShipping sub={s} />
                  <br />
                  <Discount s={s} />
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
})
