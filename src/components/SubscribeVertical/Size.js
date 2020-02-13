import React, { useContext } from 'react'
import SubscribeStore from '../../stores/SubscribeVerticalStore'
// import { observer } from 'mobx-react'
//import { toJS } from 'mobx'
import { Border } from '../General/Border'
import {
  circle,
  dropShadow,
  circleContent,
} from '../../styles/Components/Circle.module.scss'

/**
 *  Contains the single view Vertical subscribe flow
 *
 */

export const Size = props => {
  console.log(props.data)
  const store = useContext(SubscribeStore)
  return (
    <div className="column">
      <Border
        color={props.color}
        active={store[props.data.key] === props.data.value ? true : false}
      >
        <button
          className={
            circle + ' ' + dropShadow + ' ' + circleContent + ' btnClearfix'
          }
          href="#"
          onClick={e => {
            e.preventDefault()
            store.set(props.data.key, props.data.value)
          }}
        >
          <p>{props.data.title}</p>
        </button>
      </Border>
    </div>
  )
}
