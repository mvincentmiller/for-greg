//AccountStore.js
import moment from 'moment'
import { createContext } from 'react'
import { action, decorate, observable, computed, toJS } from 'mobx'
import { SKU_PREFIX } from '../shop-config'
import { graphQlQuery } from './bulu'
import { loader } from 'graphql.macro'

//const boxBuilder = REACT_APP_BOXBUILDER
//const API_URL = `https://${REACT_APP_BOXBUILDER}/api/graphql/`

const UPDATE_USER = loader('./queries/updateUser.gql')
const CANCEL_SUBSCRIPTION = loader('./queries/cancelSubscription.gql')
const UPDATE_SUBSCRIPTION_ADDRESS = loader(
  './queries/subscriptionAddressUpdate.gql'
)
const SKIP_BOX = loader('./queries/skipBox.gql')
const ADD_DISCOUNT = loader('./queries/addDiscount.gql')
const RECOVER = loader('./queries/recover.gql')
const UPDATE_PAYMENT = loader('./queries/updatePayment.gql')
const UPDATE_BILLING = loader('./queries/updateBilling.gql')
const FETCH_USER = loader('./queries/fetchUser.gql')
const SET_PASSWORD = loader('./queries/setPassword.gql')
const LOGIN = loader('./queries/login.gql')
const RESET_PASSWORD = loader('./queries/resetPassword.gql')
const FETCH_VARIANT = loader('./queries/fetchVaraints.gql')

class Subscription {
  /**
   * Holds all the Data for a subscription.
   * SubscriptionStore has an observable map
   * of Subscription objects.
   */
  data = null
  fitModalActive = false
  choiceModalActive = false
  editAddressActive = false

  set(key, value) {
    this[key] = value
  }
  setData(key, value) {
    this.data[key] = value
  }

  get id() {
    return this.data.id
  }
  get customer() {
    return this.data.customer
  }
  get sku() {
    return this.data.sku
  }
  get price() {
    return this.data.scheduled_shipments[0].charge_total
  }
  get metadata() {
    return this.data.metadata
  }
  get address() {
    return this.data.address
  }
  get status() {
    return this.data.status
  }
  get isCancelled() {
    return this.status === 'Cancelled'
  }
  get title() {
    return this.data.product_title
  }
  get nextCharge() {
    return moment(this.data.nextChargeDate).format('MMMM D, YYYY')
  }

  get schedule() {
    if (this.isQuarterly || this.isCustom) {
      return this.months
    } else if (this.isPrincess && !this.isYearly) {
      return 'Every 2 Months'
    }
    return 'Every Month'
  }

  get nextShipment() {
    return moment(this.data.next_shipment_date)
  }

  get renewalDate() {
    if (!this.data.renewal_date) {
      return null
    }
    return moment(this.data.renewal_date)
  }
}

decorate(Subscription, {
  data: observable,
  set: action,
  setData: action,
  fitModalActive: observable,
  choiceModalActive: observable,
  editAddressActive: observable,
  id: computed,
  sku: computed,
  price: computed,
  metadata: computed,
  address: computed,
  schedule: computed,
  nextShipment: computed,
  renewalDate: computed,
})

export class AccountStore {
  COOKIE = 'pooch'
  APP_STORE = 'pooch_appStore'
  thing = 'init'
  customerToken = null
  toast = { display: false, message: '' }
  customer = null
  accountTab = '#mySubscriptions'
  newPassword = null
  confirmPassword = ''
  subscriptions = observable.map()
  variants = observable.map()
  renderCardForm = false
  boxes = []
  newEmail = ''
  firstName = ''
  lastName = ''
  discountCode = ''

  post = (url, data, head = { 'Content-Type': 'application/json' }) => {
    console.log(data)
    return fetch(url, {
      method: 'POST',
      cache: 'default',
      mode: 'cors',
      headers: head,
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json()
      })
      .catch(console.log)
  }

  get = (url, data, head = {}) => {
    return fetch(url, {
      method: 'POST',
      cache: 'default',
      mode: 'cors',
      headers: head,
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .catch(console.log)
  }

  query = (query, variables) => {
    return graphQlQuery(query.loc.source.body, variables)
  }

  updateUser = async () => {
    const query = UPDATE_USER
    const vars = {
      accessToken: this.customerToken.accessToken,
      customer: {
        name: this.firstName + ' ' + this.lastName,
        email: this.newEmail,
      },
    }
    var r = await graphQlQuery(query.loc.source.body, toJS(vars))
    console.log(r)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      this.customer.name = r.data.customerUpdate.customer.name
      this.customer.email = r.data.customerUpdate.customer.email
      this.pushNotification('Updated User')
    }
    return r
  }

  login = async (email, password) => {
    const query = LOGIN
    const result = await graphQlQuery(query.loc.source.body, {
      email: email,
      password: password,
    })
    if (result.data.accountLogin !== null) {
      this.setSession(result.data.accountLogin)
      this.set('customerToken', result.data.accountLogin)
      return true
    } else {
      return false
    }
  }

  recover = async email => {
    const query = RECOVER
    console.log(query, email)
    const result = await graphQlQuery(query.loc.source.body, { email: email })
    console.log(result)
    return result
  }

  resetPassword = async (password, resetUrl) => {
    const query = RESET_PASSWORD

    var vars = {
      password: password,
      resetUrl: resetUrl,
    }
    const result = await graphQlQuery(query.loc.source.body, vars)
    console.log(result)
    return result
  }

  pushNotification = async (TostMessage, color = 'primary') => {
    this.set('toast', { display: true, message: TostMessage, color: color })
    await new Promise((resolve, reject) => setTimeout(resolve, 7500))
    this.set('toast', { display: false, message: '', color: color })
  }

  showHideNotification = async display => {
    this.set('toast', { display: display, message: this.toast.message })
  }

  updatePaymentBilling = async tokenOBJ => {
    if (!tokenOBJ.error) {
      await this.updatePayment(tokenOBJ)
      await this.updateBilling()
    } else {
      this.pushNotification('Error: ' + tokenOBJ.error.message, 'danger')
    }
  }
  updatePayment = async tokenOBJ => {
    console.log(tokenOBJ)
    const query = UPDATE_PAYMENT
    let data = {
      accessToken: this.customerToken.accessToken,
      stripeToken: tokenOBJ.token.id,
    }

    var r = await graphQlQuery(query.loc.source.body, data)
    console.log(r)
    this.customer.billingInfo = r.data
    //Check Return Data
    if (r.error) {
      this.pushNotification('Error: ' + r.error, 'danger')
    } else {
      this.pushNotification('Card Updated')
    }
    return r
  }

  cancelSubscription = async (subId, reason = 'other') => {
    const query = CANCEL_SUBSCRIPTION
    /* var chargeDate = moment(chargeDate)
      .add(1, 'month')
      .format('YYYY-MM-DD')
    console.log(chargeDate)
    */
    let data = {
      accessToken: this.customerToken.accessToken,
      subscription: {
        id: subId,
        reason: reason,
      },
    }
    let r = await graphQlQuery(query.loc.source.body, data)
    console.log(r)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      this.pushNotification('Subscription Canceled')
      //this.subscriptions.set(s.id, sub)
    }
    return r
  }

  skipBox = async (subId, chargeDate) => {
    console.log(subId, chargeDate)
    const query = SKIP_BOX
    chargeDate = moment(chargeDate)
      .add(1, 'month')
      .format('YYYY-MM-DD')
    console.log(chargeDate)
    let data = {
      accessToken: this.customerToken.accessToken,
      subscription: {
        id: subId,
        nextChargeDate: chargeDate,
      },
    }
    let r = await graphQlQuery(query.loc.source.body, data)
    console.log(r)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      this.pushNotification('Discount Added')
    }
    return r
  }

  addDiscount = async (subId, discount_code) => {
    const query = ADD_DISCOUNT
    let data = {
      accessToken: this.customerToken.accessToken,
      subscription: {
        id: subId,
        discountCode: discount_code,
      },
    }
    let r = await graphQlQuery(query.loc.source.body, data)
    console.log(r)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      this.pushNotification('Discount Added')
    }
    return r
  }

  updateSubscriptionAddress = async subscription => {
    let query = UPDATE_SUBSCRIPTION_ADDRESS

    let address = {
      id: subscription.address.id,
      name: this.firstName + ' ' + this.lastName,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipcode: this.zip,
    }

    let vars = {
      accessToken: this.customerToken.accessToken,
      addressInput: address,
    }

    console.log(vars)
    var r = await graphQlQuery(query.loc.source.body, vars)
    var tempData = toJS(this.subscriptions.get(subscription.id).data)
    console.log(tempData)
    console.log(r)
    tempData['address'] = r.data.subscriptionAddressUpdate.address
    this.subscriptions.get(subscription.id).set('data', tempData)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      this.pushNotification('Updated Shipping Address')
    }
    return r
  }

  updateBilling = async () => {
    //let stripeCustomer = await this.getCustomerBillingDetails()
    //let url1 = 'https://' + boxBuilder + '/api/stripe/billing/'
    const query = UPDATE_BILLING
    var BillingAddressInput = {
      stripeId: this.customer.stripeId,
      stripeCardId: this.customer.billingInfo.stripeCardId,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      state: this.state,
      zipcode: this.zip,
    }

    const vars = {
      accessToken: this.customerToken.accessToken,
      billingInfo: BillingAddressInput,
    }

    let r = await graphQlQuery(query.loc.source.body, vars)
    console.log(r)
    if (r.errors) {
      this.pushNotification('Error: ' + r.errors[0].message, 'danger')
    } else {
      //this.customer.billingInfo = r.data.billingAddressUpdate.billingInfo
      //this.pushNotification('Billing Updated')
    }
  }

  fetchVariants = async () => {
    const query = FETCH_VARIANT
    const vars = {
      prefix: SKU_PREFIX,
    }
    var r = await graphQlQuery(query.loc.source.body, vars)
    r.data.variants.map(v => {
      console.log(v.sku)
      var vairantSKU = v.sku
      return this.variants.set(vairantSKU, v)
    })
  }

  fetchUser = async () => {
    const query = FETCH_USER
    /* const vars = {
      AccessToken: this.customerToken.accessToken,
    }
    */
    let customerToken = toJS(this.customerToken)

    if (toJS(this.customerToken)) {
      //  let accessToken = customerToken.accessToken
      const vars = {
        AccessToken: customerToken.accessToken,
      }
      var r = await graphQlQuery(query.loc.source.body, vars)
      this.set('customer', r.data.customer)
      r.data.customer.subscriptions.map(s => {
        var sub = new Subscription()
        sub.set('data', s)
        this.subscriptions.set(s.id, sub)
        return s.id
      })
      console.log('response Data', toJS(this.customer))
      // this.set('displayName', r.data.customer.displayName)
      // let url1 = 'https://' + boxBuilder + '/api/stripe/billing/'
      // var billingData = await this.post(url1, data)
      // console.log(billingData)
      //this.set('stripeCustomer', this.customer.stripeId)
      return r
    } else {
      return null
    }
  }

  setSession = t => {
    localStorage.setItem('token', t.accessToken)
    //localStorage.setItem('expires', t.expiresAt)
  }

  //TODO: expire
  getSession = () => {
    let token = localStorage.getItem('token')
    let expires = localStorage.getItem('expires')
    return { token: token, expiresAt: expires }
  }

  clearSession = () => {
    this.customerToken = null
    this.customer = null
    localStorage.setItem('token', '')
    localStorage.setItem('expires', '')
    window.location = '/'
  }

  setPassword = async password => {
    const query = SET_PASSWORD
    var vars = {
      accessToken: toJS(this.customerToken).accessToken,
      password: password,
    }

    var r = await graphQlQuery(query.loc.source.body, vars)
    if (r.data) {
      this.set('customerToken', {
        accessToken: r.data.accountPasswordChange.accessToken,
      })
      this.setSession({ accessToken: r.data.accountPasswordChange.accessToken })
      if (r.errors) {
        this.pushNotification('Error: ' + r.errors[0].message, 'danger')
      } else {
        this.pushNotification('Password Updated')
      }
    } else {
      console.log('Error: Endpoint Error')
    }
    return r
  }

  //MAYBE KEEP CONSOLE FOR DEV?
  set(key, value) {
    console.log('setting: ', key, 'to: ', value)
    this[key] = value
    let poochStore = JSON.parse(window.sessionStorage.getItem(this.APP_STORE))
    if (poochStore !== null) {
      poochStore[key] = value
    } else {
      poochStore = {}
      poochStore[key] = value
    }
    window.sessionStorage.setItem('pooch', JSON.stringify(poochStore))
  }
}

decorate(AccountStore, {
  //Observables
  variants: observable,
  toast: observable,
  email: observable,
  password: observable,
  customerToken: observable,
  newPassword: observable,
  confirmPassword: observable,
  recoveryEmail: observable,
  accountTab: observable,
  boxes: observable,
  newEmail: observable,
  lastName: observable,
  firstName: observable,
  displayName: observable,
  address1: observable,
  address2: observable,
  city: observable,
  provinceCode: observable,
  zip: observable,
  discountCode: observable,
  customer: observable,
  card_name: observable,
  card_type: observable,
  card_Last4: observable,
  card_expMonth: observable,
  card_expYear: observable,
  renderCardForm: observable,
  nameOnCard: observable,
  //Actions
  setPassword: action,
  updatePayment: action,
  addDiscount: action,
  showHideNotification: action,
  updatePaymentBilling: action,
  pushNotification: action,
  recover: action,
  set: action,
  fetchUser: action,
  fetchRechargeUser: action,
  setSession: action,
  getSession: action,
  clearSession: action,
  cancelSubscription: action,
  skipBox: action,
  resetPassword: action,
})

export default createContext(new AccountStore())
