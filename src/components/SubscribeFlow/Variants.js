import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import { toJS } from 'mobx'
import ThingStore from '../../stores/ThingStore.js'

/**
 * Variants observes ThingStore
 *
 * The store contains a list of select vairants that are renderd baised on
 * the choices a user selects.
 *
 * Then the selected vairant is set in the store.
 *
 */
export const Variants = observer(() => {
  const store = useContext(ThingStore)

  let sv = toJS(store.variants)

  const handleSelect = (e, t, v) => {
    e.preventDefault()
    store.set('variantSelected', t)
    store.set('variant', v)
  }

  return (
    <div style={{ padding: '1em' }}>
      <div
        className="columns is-multiline"
        style={{ background: '#f1f1f1', color: '#fcfcfc', paddingLeft: '2em' }}
      >
        {sv &&
          Object.keys(sv).map(key => {
            return (
              <div>
                {sv[key].id === store.variantSelected &&
                  sv[key].variantTitle === store.variantTitle && (
                    <div
                      className="column"
                      style={{ background: '#17171c', color: '#fcfcfc' }}
                    >
                      <div
                        style={{ padding: '1em' }}
                        name={sv[key].id}
                        onClick={e => handleSelect(e, sv[key].id, sv[key])}
                      >
                        <div style={{ padding: '2em' }}>
                          <img
                            alt="variant"
                            style={{
                              width: '60px',
                              height: '60px',
                              margin: '0 auto',
                              marginBottom: '2em',
                            }}
                            src={sv[key].image}
                          />
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </p>
                          <h1>${sv[key].price}</h1>
                          <p>
                            {sv[key].productTitle} <br /> ({' '}
                            {sv[key].variantTitle} )
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                {sv[key].id !== store.variantSelected &&
                  sv[key].variantTitle === store.variantTitle && (
                    <div
                      className="column"
                      style={{ background: '#fcfcfc', color: '#171717' }}
                    >
                      <div
                        style={{ padding: '1em' }}
                        name={sv[key].id}
                        onClick={e => handleSelect(e, sv[key].id, sv[key])}
                      >
                        <div style={{ padding: '2em' }}>
                          <img
                            alt="variant"
                            style={{
                              width: '60px',
                              height: '60px',
                              margin: '0 auto',
                              marginBottom: '2em',
                            }}
                            src={sv[key].image}
                          />

                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit, sed do eiusmod tempor incididunt ut labore et
                            dolore magna aliqua. Ut enim ad minim veniam, quis
                            nostrud exercitation ullamco laboris nisi ut aliquip
                            ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore
                            eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                          </p>

                          <h1>${sv[key].price}</h1>
                          <p>
                            {sv[key].productTitle} <br />({' '}
                            {sv[key].variantTitle} )
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            )
          })}
      </div>
    </div>
  )
})
