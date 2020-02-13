import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { Link } from '../../styles/AccountInfo.module.scss'

/**
 * Skip observes AccountStore
 * Skip skips the current subscription for a specified time.
 * Skip calls `store.skipBox` and returns a notificaiton via `<Notify/>`
 *
 */

export const Skip = observer(props => {
  const store = useContext(AccountStore)
  const [active, setActive] = useState(false)

  const toggleModal = event => {
    if (event) {
      event.preventDefault()
    }
    setActive(!active)
  }

  const skip = () => {
    store.skipBox(props.s.data.id, props.s.data.nextChargeDate)
    toggleModal()
  }
  const contactSupport = () => {
    //window.location = 'https://jointhepoochpack.com/pages/contact-us'
  }
  return (
    <div>
      {/*eslint-disable-next-line */}
      <button className={'a11y ' + Link} href="#" onClick={toggleModal}>
        Skip Next Box
      </button>
      <div className={'modal ' + (active ? 'is-active' : '')}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <header className="modal-card-head">
            <p className="modal-card-title">Skip Subscription</p>
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
              <h1
                style={{
                  fontWeight: '500',
                  fontSize: '21px',
                }}
              >
                Are you sure?
                <br /> We don't want you to miss your next box.
              </h1>
              <br />
            </div>
            <div className="columns">
              <div className="column">
                <button
                  className="button is-fullwidth is-danger"
                  onClick={contactSupport}
                >
                  Back
                </button>
              </div>
              <div className="column">
                <button
                  className="button is-fullwidth is-success"
                  onClick={skip}
                >
                  No, Skip this Box
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
})
