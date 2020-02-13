import { REACT_APP_BOXBUILDER } from '../shop-config'
import { createContext } from 'react'
import { observable, action, decorate, computed } from 'mobx'
import { loader } from 'graphql.macro'

import { graphQlQuery } from './bulu'

const CHECKOUT_CREATE = loader('./queries/checkoutCreate.gql')
const CHECKOUT_UPDATE = loader('./queries/checkoutUpdate.gql')
const CHECKOUT_PROCESS = loader('./queries/checkoutProcess.gql')
//const FETCH_VARIANTS = loader('./queries/fetchVaraints.gql')

class Address {
  name = null
  address1 = null
  address2 = null
  city = null
  state = null
  zipcode = null

  setAddress = address => {
    if (address) {
      this.set('name', address.name)
      this.set('address1', address.address1)
      this.set('address2', address.address2)
      this.set('city', address.city)
      this.set('state', address.state)
      this.set('zipcode', address.zipcode)
    }
  }

  set(key, value) {
    console.log('set: ', key, value)
    this[key] = value
  }

  get data() {
    return {
      name: this.name,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
    }
  }

  get valid() {
    return (
      this.name !== null &&
      this.address1 !== null &&
      this.city !== null &&
      this.state !== null &&
      this.zipcode !== null
    )
  }
}

class CheckoutStore {
  checkout = null
  errors = null
  billingAddress = new Address()
  shippingAddress = new Address()
  sameAsShipping = true
  processing = false

  set(key, value) {
    this[key] = value
  }

  get token() {
    return localStorage.getItem('checkoutToken')
  }

  fetchVariants = async () => {
    localStorage.clear()
    const response = await fetch(
      `https://${REACT_APP_BOXBUILDER}/api/shopify/variants/`
    )
    const variants = await response.json()

    await this.set('variants', variants)
    console.log(this.variants)
    //console.log(this.variants)
  }

  updateDiscountCode = discountCode => {
    this.checkoutUpdate({
      discountCode: discountCode,
    })
  }

  updateEmail = email => {
    this.checkoutUpdate({
      email: email,
    })
  }

  updateAddress = () => {
    let data = {}
    console.log(this.shippingAddress.data)
    console.log(this.shippingAddress.valid)
    console.log(this.billingAddress.valid)
    if (this.shippingAddress.valid) {
      data['shippingAddress'] = this.shippingAddress.data
    }

    if (this.billingAddress !== null) {
      if (this.billingAddress.valid) {
        data['billingAddress'] = this.billingAddress.data
      }
    }
    if (this.sameAsShipping) {
      if (this.shippingAddress.valid) {
        data['billingAddress'] = this.shippingAddress.data
      }
    }
    console.log(data)
    this.checkoutUpdate(data)
  }

  checkoutMutation = async (query, mutation, variables) => {
    let data = await graphQlQuery(query, variables)
    this.processing = false
    let checkout = data.data[mutation].checkout
    if (mutation === 'checkoutProcess') {
      let success = data.data[mutation].success
      success
        ? (window.location.hash = '/thanks')
        : (window.location.hash = '/error')
    }
    if (checkout) {
      //let billing = new Address()
      this.billingAddress.setAddress(checkout.billingAddress)
      //this.set('billingAddress', billing)

      //let shipping = new Address()
      this.shippingAddress.setAddress(checkout.shippingAddress)
      //this.set('shippingAddress', shipping)

      localStorage.setItem('checkoutToken', checkout.token)
      this.set('checkout', checkout)
      if (mutation === 'checkoutProcess') {
        localStorage.removeItem('checkoutToken')
      }
    }
  }

  moneyFormat = number => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number)
  }

  checkoutCreate = variantId => {
    console.log(variantId)
    if (this.token !== null) {
      console.log(this.token)
      return this.checkoutUpdate({
        lineItems: [
          {
            variantId: variantId,
            quantity: 1,
            properties: {},
          },
        ],
      })
    }
    let query = CHECKOUT_CREATE

    console.log(query.loc)

    this.checkoutMutation(query.loc.source.body, 'checkoutCreate', {
      checkout: {
        lineItems: [
          {
            variantId: variantId,
            quantity: 1,
          },
        ],
      },
    })
  }

  loadCheckout = () => {
    this.checkoutUpdate({})
  }

  checkoutUpdate = data => {
    console.log('checkoutUpdate', data)
    let query = CHECKOUT_UPDATE
    this.checkoutMutation(query.loc.source.body, 'checkoutUpdate', {
      checkout: {
        token: this.token,
        ...data,
      },
    })
  }

  checkoutProcess = stripeToken => {
    console.log('TODO: Validate Address + email before processing')
    this.processing = true
    let query = CHECKOUT_PROCESS

    this.checkoutMutation(query.loc.source.body, 'checkoutProcess', {
      checkout: {
        token: this.token,
        stripeToken: stripeToken,
      },
    })
  }
}

decorate(Address, {
  setAddress: action,
  name: observable,
  address1: observable,
  address2: observable,
  city: observable,
  state: observable,
  zipcode: observable,
  data: computed,
  valid: computed,
  set: action,
})

decorate(CheckoutStore, {
  token: computed,
  checkout: observable,
  errors: observable,
  billingAddress: observable,
  shippingAddress: observable,
  sameAsShipping: observable,
  processing: observable,
  set: action,
  moneyFormat: action,

  updateEmail: action,

  checkoutCreate: action,
  checkoutUpdate: action,
  checkoutProcess: action,
})

export default createContext(new CheckoutStore())
