import React, { useContext, useState } from 'react'
import { observer } from 'mobx-react'
import AccountStore from '../../stores/AccountStore'
import { EditPassword } from './EditPassword'
import { EditName } from './EditName'
import { EditEmail } from './EditEmail'
import {
  accountSectionHeader,
  accountSubSectionHeader,
  Link,
} from '../../styles/AccountInfo.module.scss'

/**
 * AccountInformation observes the AccountStore
 * Displays the current account information
 * Contains the actions to the Billing Address, Card On File
 * Account Information Edit, Change Password, forms.
 *
 */

export const AccountInformation = observer(props => {
  const store = useContext(AccountStore)
  const [showForm, setShowForm] = useState(false)
  const handleForm = event => {
    event.preventDefault()
    setShowForm(!showForm)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await store.updateUser()
    setShowForm(false)
  }

  const validateEmail = addr => {
    //eslint-disable-next-line
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(addr)) {
      return true
    }
    return false
  }

  const validateForm = () => {
    //let e = store.newEmail.length > 0
    let e = validateEmail(store.newEmail)
    let n = store.firstName.length > 0 && store.lastName.length > 0
    return e && n
  }

  return (
    <div className="box" style={{ background: '#f2f2f2', padding: '1.5em' }}>
      <h3 className={accountSectionHeader}>Account Information</h3>
      <div className="columns">
        <div className="column">
          {!showForm && (
            <div>
              <div className="columns">
                <div className="column">
                  <p className={accountSubSectionHeader}>Name</p>
                  <p> {store.customer && store.customer.name} </p>
                </div>
                <div className="column">
                  <p className={accountSubSectionHeader}>Email</p>
                  <p>{store.customer && store.customer.email}</p>
                </div>
              </div>
              <button className="a11y" onClick={handleForm} href="#">
                {' '}
                Edit
              </button>
            </div>
          )}
          {showForm && (
            <div>
              <div>
                <p className={accountSubSectionHeader}>Name</p>
                <EditName />
                <p className={accountSubSectionHeader}>Email</p>
                <EditEmail />
              </div>
              <div className="field is-grouped" style={{ margin: '1em 0 0 0' }}>
                <p className="control is-expanded">
                  {/*eslint-disable-next-line */}
                  <a href="#" className={Link} onClick={handleForm} href="#">
                    Cancel
                  </a>
                </p>
                <p className="control">
                  <button
                    className="button btn-orange"
                    disabled={!validateForm()}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    UPDATE
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="column">
          <p className={accountSubSectionHeader}>Password</p>
          <EditPassword
            showForm={() => {
              showForm()
            }}
          />{' '}
        </div>
      </div>
    </div>
  )
})
