import React from 'react'
import { observer } from 'mobx-react'

import { footer, footerHeader } from '../styles/Footer.module.scss'

/**
 * Footer
 *
 * Renders the footer markup in plain markup useing bluma.
 */

export const Footer = observer(props => (
  <div className={footer}>
    <div className="container">
      <div className="columns">
        <div className="column is-3">
          <p className={footerHeader}>---</p>
          <ul>
            <li>
              <a
                href="https://bulubox.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                ---
              </a>
            </li>
            <li>
              <a href="https://crayolaciybox.com">---</a>
            </li>
            <li>
              <a
                href="https://disneysubscriptions.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                ---
              </a>
            </li>
            <li>
              <a
                href="https://lunarly.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ---
              </a>
            </li>
            <li>
              <a
                href="https://TheSharkWeekBox.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ---
              </a>
            </li>
          </ul>
        </div>
        <div className="column is-3">
          <p className={footerHeader}>Subscribers</p>
          <ul>
            <li>
              <a href="/#/account">Account</a>
            </li>
            <li>
              <a href="/#">Contact</a>
            </li>
            <li>
              <a href="/#/faq">FAQs</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="has-text-centered">
        <p>© 2019 </p>
      </div>
    </div>
  </div>
))

export default Footer
