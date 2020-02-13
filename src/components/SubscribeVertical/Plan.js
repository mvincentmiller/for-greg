import React, { useContext } from 'react'
import SubscribeStore from '../../stores/SubscribeVerticalStore'
//import { observer } from 'mobx-react'
//import { toJS } from 'mobx'
import { Border } from '../General/Border'

/**
 *  Contains the single view Vertical subscribe flow
 *
 */

export const Plan = props => {
  console.log(props.data)
  const store = useContext(SubscribeStore)
  return (
    <div className="column">
      <Border
        color={props.color}
        active={store[props.data.key] === props.data.value ? true : false}
      >
        <button
          className="box btnClearfix"
          style={{ borderRadius: '3px' }}
          href="#"
          onClick={e => {
            e.preventDefault()
            store.set(props.data.key, props.data.value)
          }}
        >
          <p style={{ textAlign: 'center', padding: '40px 20px' }}>
            {props.data.mostPopular === true && <p>Most Popular!</p>}
            <h2 class="title">{props.data.title} plan</h2>
            <p>
              {props.data.title.split(' ')[0]} consecutive deliveries at $0.00
              each!
            </p>
          </p>
        </button>
      </Border>
    </div>
  )
}
