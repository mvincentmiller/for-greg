import React, { useContext } from 'react'
import SubscribeStore from '../../stores/SubscribeVerticalStore'
// import { observer } from 'mobx-react'
// import { toJS } from 'mobx'
import { Border } from '../General/Border'

/**
 *  Contains the single view Vertical subscribe flow
 *
 */

export const DeluxeBox = props => {
  const store = useContext(SubscribeStore)
  return (
    <div className="column">
      <Border
        color={props.color}
        active={store[props.data.key] === props.data.value ? true : false}
      >
        <button
          className="box btnClearfix"
          href="#"
          onClick={e => {
            e.preventDefault()
            store.set(props.data.key, props.data.value)
          }}
        >
          <div
            style={{ maxWidth: '300px', margin: '0 auto', textAlign: 'center' }}
          >
            <img
              alt="deluxe"
              style={{ width: '300px' }}
              src={props.data.image}
            />
            <p>{props.data.title}</p>
          </div>
        </button>
      </Border>
    </div>
  )
}
