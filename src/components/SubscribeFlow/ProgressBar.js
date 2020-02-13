import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import UiStore from '../../stores/UiStore.js'

/**
 * ProgressBar observes the UiStore
 * This progress bar (based on Bulma classes) displays the place in the subscribe flow.
 * Reads progress value from the Ui Store.
 */

export const ProgressBar = observer(props => {
  const uiStore = useContext(UiStore)

  return (
    <progress class="progress is-small" value={uiStore.progress} max="100">
      {props.value}%
    </progress>
  )
})
