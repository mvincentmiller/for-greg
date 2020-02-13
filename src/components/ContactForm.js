import React, { useContext, useState } from 'react'
import AccountStore from '../stores/AccountStore.js'
import { NavBar } from './NavBar'
const validateEmail = email => {
  const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexp.test(email)
}

const validateMsg = msg => {
  console.log(msg)
  if (msg !== null && msg !== '') {
    return true
  } else {
    return false
  }
}

export const ContactUs = () => {
  const store = useContext(AccountStore)
  const [email, setEmail] = useState(null) // [state var, setter] = useState(initialState)
  const [message, setMessage] = useState(null)
  const [isSent, setSent] = useState(false)
  const [isValidEmail, setValidEmail] = useState(false)

  const postContact = store => {
    const payload = {
      email: email,
      first_name: 'string',
      last_name: 'string',
      subject: 'string',
      message: message,
      program: 'GOLD STANDARD',
    }

    const url = 'https://gold.staging.bulubox.com/api/contact/'

    if (email !== null) {
      store.post(url, payload).then(r => {
        if (Object.keys(r).length === 6) {
          setSent(true)
        }
      })
    } else {
      alert('please enter a valid email')
    }
  }

  const commonChange = event => {
    console.log(event)
    //this.setState({ [event.target.name]: event.target.value })

    if (event.target.name === 'email') {
      let isValidEmail = validateEmail(event.target.value)
      if (isValidEmail) {
        setValidEmail(true)
        setEmail(event.target.value)
        console.log(email)
      } else {
        setValidEmail(false)
      }
    }

    if (event.target.name === 'message') {
      let isValidMsg = validateMsg(event.target.value)
      if (isValidMsg) {
        setMessage(event.target.value)
      }
    }

    //this.checkForInput()
  }

  if (!isSent) {
    return (
      <div className="container" style={{ minHeight: '900px' }}>
        <NavBar />
        <div className="box">
          <h1 className="title">Contact Us!</h1>
          <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={e => commonChange(e)}
                className="input"
                type="email"
                name="email"
                placeholder="Email input"
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-exclamation-triangle"></i>
              </span>
            </div>
            {!isValidEmail && (
              <p className="help is-danger">This email is invalid</p>
            )}
          </div>

          <div className="field">
            <label className="label">Message</label>
            <div className="control">
              <textarea
                onChange={e => commonChange(e)}
                name="message"
                className="textarea"
                placeholder="Textarea"
              ></textarea>
            </div>
          </div>

          <div className="field is-grouped is-grouped-right">
            <div className="control">
              <button
                onClick={() => postContact(store)}
                className="button is-link"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  if (isSent) {
    return (
      <div className="container" style={{ minHeight: '900px' }}>
        <NavBar />
        <div className="container">
          <div className="box">
            <h1 className="title">Your Message Has Been Sent.</h1>
            <p>From: {email}</p>

            <p style={{ marginTop: '2em' }}>{message}</p>
          </div>
        </div>
      </div>
    )
  }
}
