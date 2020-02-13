import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import ThingStore from '../../stores/ThingStore'

/**
 * ThingComponent observes the ThingStore
 * A basic react component + mobx use context example.
 */

export const ThingComponent = observer(props => {
  const store = useContext(ThingStore)
  console.log(props)
  return (
    <div>
      <p>{store.thing}</p>
    </div>
  )
})
