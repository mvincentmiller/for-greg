import React, { useContext, useEffect } from 'react'
import SubscribeStore from '../../stores/SubscribeVerticalStore'
import { observer } from 'mobx-react'
import { DeluxeBox } from './Deluxe'
import { Size } from './Size'
import { Plan } from './Plan'
import { Columns } from './DataColumns'
// import reactSimpleCodeEditor from 'react-simple-code-editor'

/**
 *  Contains the single view Vertical subscribe flow
 *
 */

export const SubscribeVertical = observer(props => {
  const store = useContext(SubscribeStore)
  let step1 = {
    Deluxe: {
      title: 'Deluxe Adventure Box',
      image:
        'https://cdn.shopify.com/s/files/1/0277/1759/9316/products/silver.png?v=1570638203',
      key: 'plan',
    },
    Basic: {
      title: 'Basic Adventure Box',
      image:
        'https://cdn.shopify.com/s/files/1/0277/1759/9316/products/silver.png?v=1570638203',
      key: 'plan',
    },
  }

  let step2 = {
    S: {
      title: 'S',
      key: 'size',
    },
    M: {
      title: 'M',
      key: 'size',
    },
    L: {
      title: 'L',
      key: 'size',
    },
    XL: {
      title: 'XL',
      key: 'size',
    },
  }

  let step3 = {
    '3': {
      image: '',
      title: '4 month',
      key: 'month',
    },
    '6': {
      image: '',
      title: '6 month',
      key: 'month',
    },
    '12': {
      image: '',
      title: '12 month',
      key: 'month',
    },
  }
  /*
  function delay(ms) {
    return new Promise(function(resolve) {
      return setTimeout(resolve, ms)
    })
  }
  */

  const grab = async () => {
    await store.fetchVariants()
  }
  useEffect(() => {
    grab()
    //eslint-disable-next-line
  }, []) //[] tells react to only run on mount

  return (
    <div className="section" style={{ minHeight: '1000px' }}>
      <div className="columns">
        <div className="column has-text-centered welcome-message">
          <h1 className="is-size-1">Wow! Subscribe.</h1>
        </div>
      </div>

      {store.variants.size !== 0 && (
        <div style={{ marginTop: '1.5em' }}>
          <div className="columns">
            <div className="column has-text-centered	">
              <p className="is-size-3">Choose Your plan:</p>
            </div>
          </div>
          <Columns Component={DeluxeBox} data={step1} />
        </div>
      )}
      {store.variants.size !== 0 && store.plan !== null && (
        <div style={{ marginTop: '1.5em' }}>
          <div className="columns">
            <div className="column has-text-centered	">
              <p className="is-size-3">Select a Size</p>
            </div>
          </div>
          <Columns Component={Size} data={step2} columnClass="is-mobile" />
        </div>
      )}
      {store.variants.size !== 0 && store.size !== null && (
        <div style={{ marginTop: '1.5em' }}>
          <div className="columns">
            <div className="column has-text-centered	">
              <p className="is-size-3">Choose your Plan</p>
            </div>
          </div>
          <Columns Component={Plan} data={step3} />
        </div>
      )}
      {store.variants.size !== 0 && store.month !== null && (
        <div style={{ marginTop: '1.5em' }}>
          <div className="columns">
            <div className="column has-text-centered	">
              <a
                className="button large"
                href={'#/checkout?variantId=' + store.vairantID}
                onClick={() => {
                  console.log(store.vairantID)
                }}
              >
                Continue to Checkout
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
