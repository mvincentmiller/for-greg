import React from 'react'
import { observer } from 'mobx-react'
import { EditCard } from './EditCard'
import {
  accountSectionHeader,
  accountSubSectionHeader,
} from '../../styles/AccountInfo.module.scss'
import { EditBilling } from './EditBillingInfomration'

/**
 * BillingInformation
 * Contains the Lower section of Account Info
 * Allows the user to Edit Billing Address and the card on file.
 */

export const BillingInformation = observer(props => {
  return (
    <div className="box" style={{ background: '#f2f2f2', padding: '1.5em' }}>
      <h3 className={accountSectionHeader}>Billing Information</h3>
      <div className="columns">
        <div className="column">
          <EditBilling />
        </div>
        <div className="column">
          <p className={accountSubSectionHeader}>Card on File</p>
          <EditCard />
        </div>
      </div>
    </div>
  )
})
