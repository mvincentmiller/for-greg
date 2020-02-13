import React from 'react'
import axe from 'axe-core'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

let wrapper
export function mountToDoc(reactElm) {
  if (!document) {
    // Set up a basic DOM
    global.document = jsdom('<!doctype html><html><body></body></html>')
  }
  if (!wrapper) {
    wrapper = document.createElement('main')
    document.body.appendChild(wrapper)
  }

  const container = mount(reactElm)
  wrapper.innerHTML = ''
  wrapper.appendChild(container.getDOMNode())
  return container
}

class Link extends React.Component {
  render() {
    return <a href={this.props.page}>{this.props.children}</a>
  }
}

describe('accessibility', () => {
  it('Component should have no axe violations', done => {
    const linkComponent = mountToDoc(
      <img
        alt="cat"
        src="https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      />
    )
    const linkNode = linkComponent.getDOMNode()

    const config = {
      // rules: {
      //     'color-contrast': { enabled: true },
      //     'link-in-text-block': { enabled: false }
      // }
    }

    axe.run(linkNode, config, (err, { violations }) => {
      console.log('axe violations:', violations)
      console.log('errors:', err)
      console.log()
      expect(err).toBe(null)
      expect(violations).toHaveLength(0)
      done()
    })
  })
})
