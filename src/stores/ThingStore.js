//ThingStore.js
import { createContext } from 'react'
import { action, decorate, observable } from 'mobx'

export class ThingStore {
  thing = 'init'
  variants = null
  variant = null
  variantSelected = null
  variantTitle = null

  set = (key, value) => {
    this[key] = value
  }

  fetchVariants = async () => {
    const response = await fetch(
      'https://gold.staging.bulubox.com/api/shopify/variants/'
    )

    const variants = await response.json()
    this.set('variants', variants)
  }
}

// https://gold.staging.bulubox.com/api/shopify/variants/

decorate(ThingStore, {
  thing: observable,
  variants: observable,
  variantSelected: observable,
  variant: observable,
  variantTitle: observable,
  set: action,
})

export default createContext(new ThingStore())
