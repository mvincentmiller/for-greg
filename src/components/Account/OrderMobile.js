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
 * This Component is only visible on mobile.
 */

export const OrderMobile = props => {
  return (
    <div style={{ padding: '5px' }}>
      <p>
        <strong>Order Number:</strong> {props.box.orderNumber}
      </p>
      <p>
        <strong>Order Date:</strong>{' '}
        {moment(props.box.orderDate).format('MMMM D, YYYY')}
      </p>
      <p>
        <strong>Shipping Date:</strong>{' '}
        {props.box.shippingDate === null
          ? 'Not Shipped'
          : moment(props.box.shippingDate).format('MMMM D, YYYY')}
      </p>
      <p>
        <strong>Fulfillment Status:</strong>{' '}
        {props.box.trackingNumber === null
          ? 'Unfulfilled'
          : props.box.trackingStatus === 'Unfulfilled'
          ? 'Scheduled'
          : props.box.trackingStatus}
      </p>
      <p>
        {' '}
        <strong>Tracking Number:</strong>{' '}
        {props.box.trackingNumber === null ? (
          'Unavailable'
        ) : (
          <a href={props.box.trackingLink} target="blank_">
            {props.box.trackingNumber}
          </a>
        )}
      </p>
      <hr />
    </div>
  )
}
