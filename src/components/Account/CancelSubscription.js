import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { Link } from '../../styles/AccountInfo.module.scss'

/**
 * CancelSubscription
 * Cancels the users's subscription. After displaying a confirmation modal to the user
 * this component fires the `store.cancelSubscription` function on the `Account Store`.
 */

export const CancelSubscription = observer(props => {
  const store = useContext(AccountStore)
  const [active, setActive] = useState(false)

  const toggleModal = event => {
    if (event) {
      event.preventDefault()
    }
    setActive(!active)
  }

  const cancel = () => {
    store.cancelSubscription(props.s.data.id)
    toggleModal()
  }
  const contactSupport = () => {
    window.location = 'https://jointhepoochpack.com/pages/contact-us'
  }
  return (
    <div>
      <button className={'a11y ' + Link} onClick={toggleModal}>
        Cancel Subscription
      </button>
      <div className={'modal ' + (active ? 'is-active' : '')}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">Cancel Subscription</p>
            <button
              className="delete"
              aria-label="close"
              onClick={toggleModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <div
              style={{
                textAlign: 'center',
              }}
            >
              <img
                style={{ maxWidth: '320px' }}
                src="https://cdn.shopify.com/s/files/1/0249/2029/3475/t/15/assets/dog_2.png?9220"
                alt="cuteDog"
              ></img>
              <h1
                style={{
                  fontWeight: '500',
                  fontSize: '21px',
                }}
              >
                Are you sure?
                <br /> We don't want your Pooch to miss their enrichment time.
              </h1>
              <h2>Can we do anything to keep you in the pack?</h2>
              <br />
            </div>
            <div className="columns">
              <div className="column">
                <button
                  className="button is-fullwidth is-success"
                  onClick={contactSupport}
                >
                  Yes, Contact Support
                </button>
              </div>
              <div className="column">
                <button
                  className="button is-fullwidth is-danger"
                  onClick={cancel}
                >
                  No, Cancel My Subscription
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
})
