import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import { Switch, Route } from 'react-router-dom'
import ThingStore from './stores/ThingStore.js'
import AccountStore from './stores/AccountStore'
import CheckoutStore from './stores/CheckoutStore'
import { Notify } from './components/General/Notify'
import {
  checkUserSession,
  //  checkCookieAndHydrate,
  verifySession,
} from './stores/bulu.js'

// MATOMO
const _paq = window._paq || []

window.addEventListener('hashchange', function() {
  _paq.push(['setCustomUrl', '/' + window.location.hash.substr(1)])
  _paq.push(['setDocumentTitle', 'internal route'])
  _paq.push(['trackPageView'])
})

export const Routes = observer(props => {
  const store = useContext(AccountStore)
  const [Thing, setComponent] = useState(null)

  const dynamicLoad = async path => {
    const module = await import('./components' + path)
    let c = Object.keys(module)[0]
    setComponent(module[c])
  }

  return (
    <main>
      <Notify />
      <Switch>
        <Route
          exact
          path="/"
          component={() => {
            let path = '/Landing/LandingContainer.js'
            dynamicLoad(path)
            //_paq.push(['trackEvent', 'Route', 'Landing'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path="/forgot-password"
          component={() => {
            let path = '/ForgotPassword'
            dynamicLoad(path)
            //_paq.push(['trackEvent', 'Route', 'ForgotPassword'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path="/reset-password"
          component={() => {
            let path = '/ResetPasswordView'
            dynamicLoad(path)

            // _paq.push(['trackEvent', 'Route', 'ResetPassword'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path="/login"
          component={() => {
            let path = '/Login'
            dynamicLoad(path)
            // _paq.push(['trackEvent', 'Route', 'Login'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          exact
          path="/faq"
          component={() => {
            let path = '/Faq'
            dynamicLoad(path)
            // _paq.push(['trackEvent', 'Route', 'FAQ'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          path="/contactus"
          component={() => {
            let path = '/ContactForm'
            dynamicLoad(path)
            //  _paq.push(['trackEvent', 'Route', 'ContactUs'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          path="/error"
          component={() => {
            let path = '/General/Error'
            dynamicLoad(path)
            //   _paq.push(['trackEvent', 'Route', 'Error'])
            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        <Route
          path="/myaccount"
          component={() => {
            let path = '/Account/AccountContainer'
            dynamicLoad(path)
            //     _paq.push(['trackEvent', 'Route', 'Account'])
            checkUserSession(store)
            if (store.customerToken) {
              if (verifySession(store) === true) {
                store.fetchVariants()
                return (
                  <div>
                    {Thing !== null ? (
                      <Thing />
                    ) : (
                      <div>
                        <p>Loading...</p>
                      </div>
                    )}
                  </div>
                )
              } else {
                store.pushNotification('Please Login')
                return (window.location.hash = '/')
              }
            } else {
              store.pushNotification('Please Login')
              return (window.location.hash = '/')
            }
          }}
        />

        <Route
          path="/checkout"
          component={() => {
            let path = '/Checkout'
            dynamicLoad(path)
            //   _paq.push(['trackEvent', 'Route', 'Checkout'])
            const store = useContext(CheckoutStore)
            const thingStore = useContext(ThingStore)

            const getUrlParameter = name => {
              //eslint-disable-next-line
              name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
              var regex = new RegExp('[\\?&]' + name + '=([^&#]*)')
              var results = regex.exec(window.location.hash)
              return results === null
                ? ''
                : decodeURIComponent(results[1].replace(/\+/g, ' '))
            }

            const loadOrCreateCheckout = (store, thingStore) => {
              //console.log(getUrlParameter('variantId'), store.checkout)

              store.checkoutCreate(getUrlParameter('variantId'))

              // if (store.token !== null && store.checkout === null) {
              //   store.loadCheckout()
              // } else if (store.token === null && store.checkout === null) {
              //   if (thingStore.variant) {
              //     store.checkoutCreate(thingStore.variant.id)
              //   } else if (getUrlParameter('variantId')) {
              //     alert()
              //           } else {
              //     window.location.href = '#/subscribe/one'
              //   }
              // }
            }

            // https://localhost:3000/#/checkout?subs_id=null&variant_id=30089995747433#/
            loadOrCreateCheckout(store, thingStore)

            return (
              <div>
                {Thing !== null ? (
                  <Thing />
                ) : (
                  <div>
                    <p>Loading...</p>
                  </div>
                )}
              </div>
            )
          }}
        />
        {/*<Route
          path="/subscribe/one"
          component={() => {
            const store = useContext(ThingStore)
            store.fetchVariants()
            return <One />
          }}
        /> 
        <Route path="/subscribe/two" component={() => <Two />} />
        <Route path="/thanks" component={() => <Confirm />} />
        */}
      </Switch>
    </main>
  )
})
