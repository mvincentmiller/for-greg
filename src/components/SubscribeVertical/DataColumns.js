import React from 'react'
//import SubscribeStore from '../../stores/SubscribeVerticalStore'
import { observer } from 'mobx-react'
// import { toJS } from 'mobx'

/**
 *  Contains the single view Vertical subscribe flow
 *
 */
/*
const useDeconstructSku = (vs, selector) => {
  if (vs) {
    var selectedVariants = Object.keys(vs).map(v => {
      if (v.includes(selector)) {
        console.log('V', v)
        return v
      }
    })
  }
  console.log('Selected', selectedVariants)
  return selectedVariants
}
*/
/**
 * Box Consumes a list of objects and displays in a column/
 */
export const Columns = observer(props => {
  //  const store = useContext(SubscribeStore)
  return (
    <div className="container">
      <div className={'columns ' + props.columnClass}>
        {props.data &&
          Object.keys(props.data).map(key => {
            //eslint-disable-next-line
            var data = new Object(props.data[key])
            data['value'] = key
            return <props.Component key={key} data={data} />
          })}
      </div>
    </div>
  )
})
