## 10.30.19

http://gold.staging.bulubox.com/api/graphql/

All graphQl Query's are intialized from this endpoint.
Here's a non exaustive list of the implemented Query's as returned from pure functions.

```javascript
/* Query Variants 
const variants = () => {
	return 
}
*/
```

## 10.24.19

https://pooch.bulubox.com/api/docs/

```javascript
/* Auth */

/*
 * POST /api/shopify/login
 */
const login = () => {}

/*
 *
 * POST /api/shopify/customer/reset/url
 */
const resetPassword = () => {}

/*
 *
 * POST /api/shopify/customer/recover
 */
const sendRecoverEmail = () => {}

/*
 * POST /api/shopify/customer/password
 */

const changePassword = () => {}

/*
 * POST /api/shopify/customer/activate
 */
const activateCustomer = () => {}

/*
 * POST /api/shopify/customer/edit
 */
const editCustomer = () => {}

/*
 * POST /api/shopify/customer/token
 */
const RefreshAccessToken = () => {}

/* Customer */

/*
 * POST /api/stripe/billing/address/update
 */
const updateBillingAddress = () => {}

/*
 * POST /api/stripe/billing/update
 */
const updatePaymentMethod = () => {}

/*
 * GET /api/customers/{id}/subscriptions
 */
const listSubscriptions = () => {}

/*
 * GET /api/customers/{id}/boxes
 */
const listShipments = () => {}

/* Subscription */

/*
 * PATCH /api/customers/{id}/addresses/{id}
 */
const updateShippingAddress = () => {}

/*
 * GET /api/customers/{id}/subscriptions/{id}/cancel
 */
const cancelSubscription = () => {}

/*
 * POST /api/customers/{id}/subscriptions/{id}/skip
 */
const skipOrderInSub = () => {}

/*
 * PATCH /api/customers/{id}/subscriptions/{id}
 * Update (size, fit, character, etc)
 */
const updateSubscription = () => {}

/*
 * POST /api/recharge/address/discount
 */
const addDiscountToAddress = () => {}

/* Checkout */

/*
 * POST /api/recharge/checkout/
 */
const createCheckout = () => {}

/*
 * POST /api/recharge/checkout/update
 */
const updateCheckout = () => {}

/*
 * POST /api/recharge/checkout/charge
 */
const processCheckout = () => {}
```

---

## Account Endpoint Docs

_A Complete list of endpoints can be found on the box builder instance that is in use for a project_

```
https://YOURBOXBUILDERINSTANCE.com/api/docs
```

_The data below is a incomplete log of what is available and may or maynot be up to date_

### Customer Data

params: accessToken

POST: `/api/shopify/customer/`

returns:

```
{
	"data": {
		"customer": {},
		"subscriptions":[{
		   "id":2,
		   "uuid":"a146159f-1bef-4132-b6e4-c2e3cf714a11",
		   "subscription_id":42762955,
		   "external_id":32441771,
		   "address":{
		      "id":3490,
		      "name":"Breanna Frerichs",
		      "address_1":"151 N 8th St",
		      "address_2":"",
		      "city":"Lincoln",
		      "state":"NE",
		      "zipcode":"68508"
		   },
		   "customer":{
		      "id":5858,
		      "uuid":"a146159f-1bef-4132-b6e4-c2e3cf714a11",
		      "name":"Breanna Frerichs",
		   },
		   "purchaser":null,
		   "box_type":4,
		   "metadata":{
		      "boxes":"2",
		      "deluxe":"0",
		      "gift_name":"Asfd",
		      "is_recurring":"false",
		      "months":[
		         "5",
		         "6"
		      ],
		      "princess":"Ariel",
		      "shipping_interval_frequency":"12",
		      "shipping_interval_unit_type":"Months",
		      "size":"4",
		      "step":"8",
		      "current_size":"4"
		   },
		   "num_scheduled_shipments":0,
		   "status":"Active",
		   "next_shipment_date":null,
		   "renewal_date":null
		}],
	}
}
```

### Customer edit

params: oldEmail, email, firstName, lastName, accessToken

POST: `/api/shopify/customer/edit/`

returns: email, firstName, lastName from the shopfiy graphql api

### Subscription Cancel:

GET: `/api/customers/{customer__uuid}/subscriptions/{subscription_id}/cancel/`

### Subscription Update (Size Update):

The size is part of the subscription metadata. We need to keep track of the original size `size`. So to update, add the new size as the `current_size` in the subscription metadata, and post back the whole metadata object, like this.

```
{
    "metadata":{
        ...
        "size":"4",
        "current_size":"4"
    }
}
```

params: metadata

PATCH: `/api/customers/{customer__uuid}/subscriptions/{subscription_id}/`
