import React from 'react'
import { observer } from 'mobx-react'
import { LandingHeader } from './LandingHeader'
//import { LandingInfo } from './LandingInfo.js'
import { Footer } from '../Footer.js'
import { SubscribeVertical } from '../SubscribeVertical/Container'
import GDPRPopup from '../General/GDPR'
// import { Modal } from '../General/Modal.js'

const Thing = () => {
  return (
    <section>
      <div className="hero-body">
        <div className="container">
          <div className="content">
            <h2 style={{ color: '#424543' }} className="title">
              Help is easy, just like you.
            </h2>
            <div className="columns">
              <div className="column">
                <img
                  alt="helpful man"
                  className="image"
                  src="https://d3bzyjrsc4233l.cloudfront.net/cache/98/39/983980592fb938e32be90ae84a042afd.jpg"
                />
                <br />
                Help not included.™
              </div>

              <div className="column">
                <h3>And that's simple.</h3>
                <p>
                  That's why you can count on this modal to{' '}
                  <strong>close</strong> quickly, quietly, and effectively.
                  Giving you more room to use this application.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/**
 * Landing Container
 *
 * Contains the page Landing Components.
 *
 */

const LandingCopy = {
  title: 'BUILD YOUR BOX.',
}

export const LandingContainer = observer(props => {
  return (
    <div>
      <GDPRPopup />
      <LandingHeader title={LandingCopy.title} />

      <SubscribeVertical />
      <section style={{ padding: '2em' }} className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="content">
              <div style={{ minHeight: '450px' }} className="columns">
                <div className="column">
                  {/*
                  <h1 className="title">Wait!</h1>
                  <h2>Don't be afraid to take the next step.</h2>
                  <p>
                    From here, anything goes. We're all just... in between
                    modals.
                    <br />
                    <br />
                    There's even a button. Or two.
                  </p>*/}
                </div>
                <div className="column">
                  <div style={{ float: 'right' }}>
                    {/* <Modal title="Learn More" inner={Thing} /> */}
                    <br />
                    <br />
                    {/* <a
                      className="button"
                      href="https://localhost:3000/#/checkout?variantId=30436558897236"
                    >
                      Standalone Checkout Demo{' '}
                    </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
})
