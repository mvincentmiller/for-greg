import React from 'react'
import moment from 'moment'

/**
 * OrderList observes AccountStore
 * Displays Order details per each box from accountStore.customer
 * Includes:
 *  - Order Number
 *  - Order Date
 *  - Shipping Date
 *  - Fulfillment Status
 *  - Tracking Number
 * This Component renders each row of the OrderList Component.
 */

export const OrderRow = props => {
  return (
    <tr style={{ padding: '5px' }}>
      <td>{props.box.orderNumber}</td>
      <td>{moment(props.box.orderDate).format('MMMM D, YYYY')}</td>
      <td>
        {props.box.shippingDate === null
          ? 'Not Shipped'
          : moment(props.box.shippingDate).format('MMMM D, YYYY')}
      </td>
      <td>
        {props.box.trackingNumber === null
          ? 'Unfulfilled'
          : props.box.trackingStatus === 'Unfulfilled'
          ? 'Scheduled'
          : props.box.trackingStatus}
      </td>
      <td>
        {props.box.trackingNumber === null ? (
          'Unavailable'
        ) : (
          <a href={props.box.trackingLink} target="blank_">
            {props.box.trackingnumber}
          </a>
        )}
      </td>
    </tr>
  )
}
