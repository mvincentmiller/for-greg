import { createContext } from 'react'
import { observable, action, decorate, computed } from 'mobx'
import Client from 'shopify-buy'
import 'whatwg-fetch'

import { post } from './utility.js'

import {
  REACT_APP_STOREFRONT_API_KEY,
  REACT_APP_SHOP_URL,
  REACT_APP_STRIPE_KEY,
  //REACT_APP_SHOP_DOMAIN,
  REACT_APP_BOXBUILDER,
} from '../shop-config'

const storefrontAPIkey = REACT_APP_STOREFRONT_API_KEY
const shopUrl = REACT_APP_SHOP_URL
const stripeKey = REACT_APP_STRIPE_KEY
//const shopDomain = REACT_APP_SHOP_DOMAIN
const boxBuilder = REACT_APP_BOXBUILDER

class CartStore {
  firstName = 'Guy'
  province = 'TX'
  lastName = 'Smiley'
  address1 = '102 w 100'
  address2 = '2'
  company = 'Co'
  city = 'Paris'
  phone = '234234234234'
  zip = '745896'
  country = 'US'
  email = 'bob@bob.com' //null
  token = ''
  checkout_token = ''
  card = {}
  shop = {}
  orders = []
  checkoutToken = ''
  discountCode = null
  variant = {}
  variantId = ''
  isGift = ''
  giftName = ''
  giftEmail = ''
  giftMessage = ''
  subtotal_price = '0.00'
  total_price = '0.00'
  total_tax = '0.00'
  shipping_rate = '0.00'
  charge_interval_frequency = 1
  order_interval_frequency = 1
  stripe = window.Stripe(stripeKey)
  emailCapture = ''
  isLoggedIn = ''

  client = Client.buildClient({
    storefrontAccessToken: storefrontAPIkey,
    domain: shopUrl,
  })

  set(key, value) {
    this[key] = value
  }

  setEmail(email) {
    this.email = email
    this.shop.email = email
    this.shop.note = email
  }

  setToken(token) {
    this.token = token
  }

  setBox(token) {
    this.box = token
  }

  setShopify(shop) {
    this.shop = shop
  }

  setStripe(card) {
    this.card = card
  }

  get build_Sku() {
    var sku = {}
    //var sku = this.rootStore.appStore.variant
    // if (this.rootStore.appStore.isRecurring) {
    //   sku += '_REC'
    // }
    // if (this.rootStore.appStore.isGift === true) {
    //   sku += '_GIF'
    // }
    return sku
  }

  build_LineItems() {
    return [
      {
        charge_interval_frequency: this.charge_interval_frequency,
        order_interval_frequency: this.order_interval_frequency,
        variant_id: this.variantId, //global.variants[this.build_Sku].id,
        properties: {
          // size: this.rootStore.appStore.size,
        },
      },
    ]
  }

  build_ShippingAddress() {
    if (
      this.firstName.length === 0 ||
      this.lastName.length === 0 ||
      this.address1.length === 0 ||
      this.address2.length === 0 ||
      this.city.length === 0 ||
      this.province.length === 0 ||
      this.zip.length === 0 ||
      this.country.length === 0 ||
      this.phone.length === 0
    ) {
      return null
    } else {
      return {
        first_name: this.firstName,
        last_name: this.lastName,
        address1: this.address1,
        address2: this.address2,
        city: this.city,
        province: this.province,
        zip: this.zip,
        country: this.country,
        phone: this.phone,
      }
    }
  }

  //TODO remove comma operator in return: no-sequences
  updateDiscount = () => {
    alert('Remove JUSTIN100.')
    post(
      'https://' + boxBuilder + '/api/recharge/checkout/update/',
      {
        checkout: {
          token: this.checkout_token,
          line_items: this.build_LineItems(),
          discount_code: 'JUSTIN100', //this.discountCode,
          shipping_address: this.build_ShippingAddress(),
          email: this.email,
        },
      },
      {
        'Content-Type': 'application/json',
      }
    )
      .then(response => {
        this.set('total_price', response.checkout.total_price)
        return 'discountSave', 'Saved!' //NO SEQUENCES!
      })
      .catch(console.log)
  }

  updateShippingAddress = () => {
    post(
      'https://' + boxBuilder + '/api/recharge/checkout/update/',
      {
        checkout: {
          line_items: this.build_LineItems(),
          shipping_address: this.build_ShippingAddress(),
          token: this.checkout_token,
          discount_code: this.discountCode,
          email: this.email,
        },
      },
      {
        'Content-Type': 'application/json',
      }
    )
      .then(response => {
        console.log(response.checkout)
        this.set('total_tax', response.checkout.total_tax)
        this.set('total_price', response.checkout.total_price)
        this.set('checkout_token', response.checkout.token)
      })
      .catch(console.log)
  }

  getSubTotal = () => {
    if (this.variantId) {
      post(
        'https://' + boxBuilder + '/api/recharge/checkout/',
        {
          checkout: {
            //discount_code: 'JUSTIN100', //this.discountCode,
            shipping_address: this.build_ShippingAddress(),
            email: this.email,
            line_items: this.build_LineItems(),
          },
        },
        {
          'Content-Type': 'application/json',
        }
      )
        .then(response => {
          console.log(response)
          //this.set('subtotal_price', response.checkout.subtotal_price)
          this.set('total_price', response.checkout.total_price)
          this.set('checkout_token', response.checkout.token)
          this.set('line_items', response.checkout.line_items)
        })
        .catch(console.log)
    } else {
      console.log('no variant')
    }
  }

  Checkout = () => {
    post(
      'https://' + boxBuilder + '/api/recharge/checkout/charge/',
      {
        card_token: this.token,
        checkout_token: this.checkout_token,
      },
      { 'Content-Type': 'application/json' }
    )
      .then(checkoutResponse => console.log(checkoutResponse))
      .catch(c => {
        console.log('But, there is a catch: ', c)
      })
  }

  // legacyCart = () => {
  //   this.post('https://' + shopDomain + '/cart/clear.js', '', {
  //     'Content-Type': 'application/json',
  //   })
  //     .then(() =>
  //       this.post(
  //         'https://' + shopDomain + '/cart/add.js',
  //         {
  //           quantity: 1,
  //           id: global.variants[this.build_Sku].id,
  //           properties: {
  //             size: this.rootStore.appStore.size,
  //             gift_name: this.rootStore.appStore.giftName,
  //             gift_email: this.rootStore.appStore.giftEmail,
  //             gift_message: this.rootStore.appStore.giftMessage,
  //             is_recurring: this.rootStore.appStore.isRecurring,
  //             is_gift: this.rootStore.appStore.isGift,
  //             shipping_interval_frequency: this.charge_interval_frequency,
  //             shipping_interval_unit_type: 'Months',
  //             charge_interval_frequency: this.charge_interval_frequency,
  //             hash: window.location.hash,
  //           },
  //         },
  //         {
  //           'Content-Type': 'application/json',
  //         }
  //       )
  //     )
  //     .then(response => {
  //       if (response) {
  //         do {
  //           var token = this.get_cookie('cart')
  //         } while (token === undefined)
  //         var myshopify_domain = shopUrl
  //         //try { var ga_linker = ga.getAll()[0].get('linkerParam') } catch(err) { var ga_linker ='' };
  //         window.location.href =
  //           'https://checkout.disneysubscription.com/r/checkout?myshopify_domain=' +
  //           myshopify_domain +
  //           '&cart_token=' +
  //           token
  //       }
  //     })
  //     .catch(console.log)
  // }
}

decorate(CartStore, {
  stripe: observable,
  legacyCart: action,
  firstName: observable,
  build_LineItems: action,
  build_Sku: computed,
  build_ShippingAddress: action,
  updateShippingAddress: action,
  pay: action,
  cancelSub: action,
  lastName: observable,
  provence: observable,
  email: observable,
  token: observable,
  box: observable,
  card: observable,
  company: observable,
  checkout: action,
  getSubTotal: action,
  shop: observable,
  answers: observable,
  user_name: observable,
  orders: observable,
  variant: observable,
  setShopify: action,
  setStripe: action,
  setEmail: action,
  setToken: action,
  setBox: action,
  fetchAnswers: action,
  setAnswers: action,
  subtotal_price: observable,
  total_price: observable,
  total_tax: observable,
  shipping_rate: observable,
  isLoggedIn: observable,
  emailCapture: observable,
})

export default createContext(new CartStore())
