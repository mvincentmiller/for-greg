import { createContext } from 'react'
import { graphQlQuery } from './bulu'
import { decorate, observable, action } from 'mobx'

const QUERY = `{
  faqCategories {
    id
    name
    order
    faqs {
      id
      order
      question
      answer
    }
  }
}`

export class FaqStore {
  faqCategories = []
  loading = false

  loadFaqCategories = async () => {
    this['loading'] = true
    const faqs = await graphQlQuery(QUERY)
    console.log(faqs)
    this['faqCategories'] = faqs.data.faqCategories
    this['loading'] = false
  }
}

decorate(FaqStore, {
  faqCategories: observable,
  loading: observable,

  loadFaqCategories: action,
})

export default createContext(new FaqStore())
