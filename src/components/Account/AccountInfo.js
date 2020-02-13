import React from 'react'
import { observer } from 'mobx-react'
import { AccountInformation } from './AccountInformation'
import { BillingInformation } from './BillingInformation'
/**
 * AccountInfo
 *
 * This component Composts `AccountInformation` and `BillingInformation`.
 * Please refer to each component for their individual documentation.
 *
 */

export const AccountInfo = observer(props => {
  return (
    <div>
      <AccountInformation />
      <br />
      <BillingInformation />
    </div>
  )
})
