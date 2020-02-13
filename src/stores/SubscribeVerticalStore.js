//import moment from 'moment'
import { createContext } from 'react'
import { action, decorate, observable } from 'mobx'
//import { REACT_APP_BOXBUILDER, SKU_PREFIX } from '../shop-config'
import { graphQlQuery } from './bulu'
import { loader } from 'graphql.macro'

//Query's
const FETCH_VARIANT = loader('./queries/fetchVaraints.gql')

export class SubscribeStore {
  variants = observable(new Map())
  variant = null
  variantSelected = null
  variantTitle = null
  plan = null
  size = null
  month = null

  set = (key, value) => {
    this[key] = value
  }

  get skuPlan() {
    switch (this.plan) {
      case 'Basic':
        return 'SKU0000X'

      case 'Deluxe':
        return '002X'

      default:
        return 'SKU'
    }
  }

  get skuSize() {
    switch (this.size) {
      case 'S':
        return '1'

      case 'M':
        return '2'

      case 'L':
        return '3'

      default:
        return '1'
    }
  }

  get vairantID() {
    return this.variants.get(this.skuPlan + '_' + this.skuSize).id
  }

  fetchVariants = async () => {
    const query = FETCH_VARIANT
    const vars = {
      prefix: '00',
    }
    var r = await graphQlQuery(query.loc.source.body, vars)
    await r.data.variants.map(v => {
      var vairantSKU = v.sku
      return this.variants.set(vairantSKU, v)
    })

    //console.log(this.variants)
  }
}

decorate(SubscribeStore, {
  variants: observable,
  variantSelected: observable,
  variant: observable,
  variantTitle: observable,
  plan: observable,
  month: observable,
  size: observable,

  set: action,
  fetchVariants: action,
})

export default createContext(new SubscribeStore())
