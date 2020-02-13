import { REACT_APP_BOXBUILDER } from '../shop-config'

/**
 *    //inside component
 *   const res = await authenticateShopifyCustomer(store)
    if (res !== false) {
      console.log('verify', res.customerAccessToken.accessToken)
      window.location.hash = '/myaccount'
      } else {
              alert('!!!')
          }
 * 
 *  
 */

export const graphQlQuery = async (query, variables) => {
  const r = await fetch(`https://${REACT_APP_BOXBUILDER}/api/graphql/`, {
    method: 'POST',
    cache: 'default',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  })

  return r.json()
  // .then(res => res.json())
  // .catch(console.log)
}

export const checkUserSession = async store => {
  //console.log('this route should be protected')
  let s = store.getSession()
  let t = s.token
  if (store.customerToken || t) {
    store.set('customerToken', { accessToken: t })
    //var response = await store.fetchUser()
    return true
  } else {
    return false
  }
}

export const verifySession = store => {
  if (store.customerToken != null) {
    checkCookieAndHydrate(store)
    store.fetchUser()
    return true
  } else {
    return false
  }
}

export const checkCookieAndHydrate = store => {
  if (window.location.hostname.indexOf('jointhepoochpack.com') !== -1) {
    let cookie = store.getCookie(store.COOKIE)
    if (cookie !== '1') {
      window.sessionStorage.removeItem(store.APP_STORE)
      store.setCookie(store.COOKIE, 1, 3600)
    }
  }
  let appStore = JSON.parse(window.sessionStorage.getItem(store.APP_STORE))
  if (appStore !== null) {
    Object.keys(appStore).map(key => store.set(key, appStore[key]))
  }
}

/**
 * use url param variant_id, in the style of Pooch
 * @param {*} cartStore
 */
export const setVariantFromUrl = cartStore => {
  var urlParams = new URLSearchParams(window.location.search)
  let vid = urlParams.getAll('variant_id')
  console.log(vid)
  cartStore.set('variantId', vid[0])
}

/**
 * use store to set/build variant_id, in the style of Disney
 * @param {*} cartStore
 */
export const setVariantFromStore = cartStore => {}

export const dummyCheckout = chk => {
  console.log(chk.discountCode)

  const query =
    `
  mutation {
    checkoutProcess(checkout: {email: "String!", 
      discountCode: "` +
    chk.discountCode +
    `",
      stripeToken: "string",
      shippingAddress: {
  name: "String!"
  address1: "String!"
  address2: "String"
  city: "String!"
  state: "String!"
  zipcode: "String!"
  country: "United States"
  phone: "5555555555"
      }
      billingAddress: {
  name: "String!"
  address1: "String!"
  address2: "String"
  city: "String!"
  state: "String!"
  zipcode: "String!"
  country: "United States"
  phone: "5555555555"
      }
      token: "STRING!"
    lineItems: [{variantId: "String", 
      quantity: 2, 
      properties: {
        key: "s"
        value: "t"
      }}
    ]}) {
      
      checkout {
        email
        discountCode
        lineItems {variantId}
      }
    }
  }
`

  const url = 'https://gold.staging.bulubox.com/api/graphql/'
  const opts = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  }
  fetch(url, opts)
    .then(res => res.json())
    .then(r => console.log(r))
    .catch(console.error)
}
