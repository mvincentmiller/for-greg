import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import { OrderRow } from './OrderRow'
import { OrderMobile } from './OrderMobile'
import { orderTable } from '../../styles/OrderList.module.scss'
import AccountStore from '../../stores/AccountStore'
/**
 * OrderList observes AccountStore
 * Displays Order details per each box from accountStore.customer
 * Includes:
 *  - Order Number
 *  - Order Date
 *  - Shipping Date
 *  - Fulfillment Status
 *  - Tracking Number
 *
 */

export const OrderList = observer(props => {
  const store = useContext(AccountStore)

  return (
    <div className="box">
      <table className={orderTable + ' is-hidden-touch'}>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Order Date</th>
            <th>Shipping Date</th>
            <th>Fulfillment Status</th>
            <th>Tracking Number</th>
          </tr>
        </thead>

        <tbody>
          {toJS(store.customer.shipments) &&
            toJS(store.customer.shipments).map(o => {
              let order = toJS(o)
              if (order.orderNumber) {
                return <OrderRow box={order} />
              }
              return null
            })}
          {!props.boxes && (
            <div className="container">
              <div className="is-center">
                <img
                  src="https://cdn.shopify.com/s/files/1/0078/4944/3401/t/14/assets/spinner.gif"
                  alt="loading"
                  id="loading-account"
                />
              </div>
            </div>
          )}
        </tbody>
      </table>
      <div className="is-hidden-desktop">
        {toJS(store.customer.shipments) &&
          toJS(store.customer.shipments).map(o => {
            let order = toJS(o)
            if (order.orderNumber) {
              return <OrderMobile box={order} />
            }
            return null
          })}
      </div>
    </div>
  )
})
