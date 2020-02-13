import React, { useState } from 'react'
import { observer } from 'mobx-react'

/**
 *
 * This is a modal using Bulma.
 */
export const Modal = props => {
  const [active, setActive] = useState(false)

  const toggleModal = props => {
    window.scrollTo(0, '#root')
    setActive(!active)
  }

  const Inner = props.inner

  return (
    <span>
      <button className="button" onClick={toggleModal}>
        {props.title}
      </button>
      <div className={'modal ' + (active ? 'is-active' : '')}>
        <div className="modal-background" onClick={toggleModal}></div>
        <div
          className="modal-content"
          style={{
            width: '800px',
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
          }}
        >
          <Inner style={{ marginTop: '3em' }} />
          <button
            className="modal-close is-large"
            aria-label="close"
            onClick={toggleModal}
            style={{ position: 'absolute', top: '10px', right: '10px' }}
          ></button>
        </div>
      </div>
    </span>
  )
}

export default observer(Modal)
