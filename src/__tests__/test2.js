import React, { useContext } from 'react'
import { ThingStore } from '../stores/ThingStore'
import CheckoutStore from '../stores/CheckoutStore'
import { dummyCheckout } from '../stores/bulu.js'

import TestRenderer from 'react-test-renderer'

var timeout = 5000
let store = new ThingStore()

beforeEach(() => {})

describe('ThingStore', () => {
  it('changes the observable', () => {
    console.log('set an observable in the Mobx store.')
    store.set('thing', 'foo')
    expect(store.thing).toBe('foo')
  })

  it('should createCheckout', () => {
    const Element = () => {
      const store = useContext(CheckoutStore)
      dummyCheckout({ discountCode: 'JUSTIN100' })
      return <div value="Provided Value">what it should be</div>
    }

    const element = new TestRenderer.create(<Element />)

    expect(element.root.findByType('div').children).toEqual([
      'what it should be',
    ])
  })
})
