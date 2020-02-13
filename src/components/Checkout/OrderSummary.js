import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import DiscountCode from './DiscountCode'

import CheckoutStore from '../../stores/CheckoutStore'

/**
 * Prices observes the CheckoutStore
 *
 * Prices renders the current checkout totals.
 */

export const Prices = observer(props => {
  const store = useContext(CheckoutStore)
  const checkout = props.checkout
  return (
    <table
      className="table"
      style={{ width: '100%', backgroundColor: '#fcfcfc' }}
    >
      <tbody>
        <tr>
          <td>Subtotal</td>
          <td className="has-text-right">
            {store.moneyFormat(checkout.subtotalPrice)}
          </td>
        </tr>
        {checkout.totalTax !== null && (
          <tr>
            <td>Tax</td>
            <td className="has-text-right">
              {store.moneyFormat(checkout.totalTax)}
            </td>
          </tr>
        )}
        {checkout.discountCode !== null && (
          <tr>
            <td>Discount ({checkout.discountCode})</td>
            <td className="has-text-right">
              {checkout.discountAmount !== 0 && (
                <span>{store.moneyFormat(-checkout.discountAmount)}</span>
              )}
            </td>
          </tr>
        )}
        <tr>
          <td>
            <b>Total</b>
          </td>
          <td className="has-text-right">
            <b>{store.moneyFormat(checkout.totalPrice)}</b>
          </td>
        </tr>
      </tbody>
    </table>
  )
})

const LineItem = observer(props => {
  const store = useContext(CheckoutStore)
  return (
    <div className="columns is-vcentered">
      <div className="column is-3">
        <img alt="line-item" src={props.item.image} />
      </div>
      <div className="column is-6">
        <p>{props.item.title}</p>
        {props.item.properties.map(property => (
          <p style={{ fontSize: '12px' }}>
            {property.key}: {property.value}
          </p>
        ))}
      </div>
      <div className="column is-3 has-text-right">
        <p>{store.moneyFormat(props.item.price)}</p>
      </div>
    </div>
  )
})

const OrderSummary = observer(() => {
  const store = useContext(CheckoutStore)
  return (
    <div className="box">
      <h2>Order Summary</h2>
      <hr style={{ marginTop: '5px' }} />
      {store.checkout.lineItems.map(item => (
        <LineItem item={item} key={item.variantId} />
      ))}
      <hr />
      <DiscountCode />
      <hr />
      <Prices checkout={store.checkout} />
    </div>
  )
})

export default OrderSummary
