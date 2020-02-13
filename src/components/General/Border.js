import React from 'react'

import {
  BorderBlue,
  BorderPink,
  BorderGold,
  BorderActiveBlue,
  BorderActivePink,
  BorderActiveGold,
  BorderDisabled,
} from '../../styles/Components/Border.module.scss'

export const Border = props => {
  const border =
    {
      blue: BorderBlue,
      gold: BorderGold,
      pink: BorderPink,
    }[props.color] || BorderBlue

  const active =
    {
      blue: BorderActiveBlue,
      gold: BorderActiveGold,
      pink: BorderActivePink,
    }[props.color] || BorderActiveBlue

  return (
    <div
      className={[
        props.active ? active : border,
        props.disableBorder ? BorderDisabled : '',
      ].join(' ')}
    >
      {props.children}
    </div>
  )
}

export default Border
