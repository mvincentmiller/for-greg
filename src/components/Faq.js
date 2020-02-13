import React, { useContext } from 'react'
import { observer } from 'mobx-react'

import { Loading } from './General/Loading'
import { Footer } from './Footer'
import { NavBar } from './NavBar'
import { faqContainer } from '../styles/FAQ.module.scss'

import FaqStore from '../stores/FaqStore'
import PropTypes from 'prop-types'

/**
 *
 * Faq
 *
 * Renders a FAQ via props
 *
 */
const Faq = props => {
  return (
    <div style={{ marginTop: '10px', marginBottom: '10px' }}>
      <h3 style={{ fontSize: '22px' }}>{props.faq.question}</h3>
      <p>{props.faq.answer}</p>
    </div>
  )
}

Faq.propTypes = {
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }),
}
/**
 *
 * FaqCategory
 *
 * Renders a list of FAQ components in a category passed in via props
 *
 * Refer to the Faq element for the props.category.faq object.
 */

const FaqCategory = props => {
  return (
    <div>
      <hr />
      <h2 style={{ fontSize: '28px', marbinBottom: '15px' }}>
        {props.category.name}
      </h2>
      {props.category.faqs.map(faq => (
        <Faq faq={faq} key={faq.id} />
      ))}
    </div>
  )
}
FaqCategory.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string.isRequired,
    faq: PropTypes.object,
  }),
}

/**
 * FaqPage observes FaqStore
 *
 * Contains the components
 * - NavBar
 * - Loading
 * - FaqCategory
 * - Footer
 *
 * Returned on route `/faq`
 */
export const FaqPage = observer(() => {
  const store = useContext(FaqStore)

  if (!store.loading && store.faqCategories.length === 0) {
    store.loadFaqCategories()
  }

  return (
    <div>
      <div className={'container ' + faqContainer}>
        <NavBar />
        <h1 style={{ fontSize: '32px' }}>Frequently Asked Questions</h1>
        {store.loading && <Loading />}
        {!store.loading && (
          <div className="columns">
            <div className="column is-3">
              <hr />
              <h3 style={{ fontSize: '22px' }}>Faq Categories</h3>
              {store.faqCategories.map(category => (
                <p style={{ marginTop: '10px' }} key={category.id}>
                  {category.name}
                </p>
              ))}
            </div>
            <div className="column is-9">
              {store.faqCategories.map(category => (
                <FaqCategory category={category} key={category.id} />
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
})

export default FaqPage
