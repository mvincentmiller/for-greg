import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const GDPRPopup = props => {
  const [active, setActive] = useState(true)
  useEffect(() => {
    if (Cookies.get('gdprBanner')) {
      setActive(false)
    } else {
    }
  }, [])
  const setCookie = () => {
    Cookies.set('gdprBanner', 1, { domain: window.location.hostname })
    setActive(false)
  }

  return (
    <div
      class="box"
      style={{
        position: 'fixed',
        width: '100%',
        height: '120px',
        bottom: '0px',
        zIndex: 10000,
        margin: 0,
        backgroundColor: 'gray',
        display: active ? 'block' : 'none',
      }}
    >
      <div
        style={{
          color: 'white',
        }}
      >
        <h1>GDPR Banner</h1>
        <p>This site uses cookies.</p>
        <button class="button is-dark" onClick={() => setCookie()}>
          Got it!
        </button>
      </div>
    </div>
  )
}

export default GDPRPopup
