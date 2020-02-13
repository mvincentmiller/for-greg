# Bulu Custom Storefront

### _Using React and Mobx_

---

## CONTRIBUTING

- **Avoid pushing to the `master` branch.** Instead, create a _Pull Request_ (PR) in the general format `milestone` and `milestone-feature` like so:

  ```bash
  git checkout -b milestone
  ```

  Prior to committing, `pull` from the base branch:

  ```
  git pull origin milestone
  ```

  Periodically the team should be able to pull in from master and base branches to avoid regressions and large merge conflicts.

Push your changes like so:

```
git add --all
git commit -m 'feature works as expected, almost'
git push origin milestone-feature
```

Git will create a link in your terminal for you to create a new PR. Click this link or go to Github.com in your browser. Make sure to merge into the right branch. For example, `master` will appear on the left of the Github 'Create Pull Request' page. and `milestone` on the right (in the case of merging a milestone into master). If you accidentally create a PR where `master` is on the left and `milestone-feature` is on the right, hit the **Edit** button in the upper right of the page to select the correct base branch.

- **Pull Requests require review.** Github will automatically suggest someone who has recently edited the files under review to be merged. **When reviewing a PR, read the code.** Try to give a thorough review. Post a few words about the review in the comment, or suggest a change. Be constructive.

- **After the PR has been accepted, the author of the PR will hit the green 'merge' button.** This gives the author a chance to make any changes they or the team have arrived at, and then doubly confirm the merge. We will almost never want to commit a feature directly to master- the exception being referred to as a 'hot fix'.

There are development tools installed:

- Husky: runs pre-commit and pre-push tasks.
- ESlint: will block a commit if there is a comma out of place or a bracket missing, etc.
- Prettier will ensure the code conforms to a consistent style.

---

## ARCHITECTURE GUIDE

- Leverage reusable, composable components.

- Avoid class based structures where functional components are an option (see below).

- Avoid monolithic style sheets in favor of component-scoped `scss` modules or in-line styles:

```JSX
import 'thingComponentStyle.scss'

const thingStyle = {
  backgroundColor: '#fff',
  margin: '0 auto',
  paddingTop: '2em',
}

const ThingComponent = props => {
  return <div style={thingStyle}>My hovercraft is full of eels.</div>
}
```

This will help avoid style regressions.

### Stateless Components and useContext(mobxStore)

_Also, an example of iterating on a collection_

```jsx
//Component.js
import React, { useContext } from 'react'
import { observer } from 'mobx-react'
import ThingStore from 'ThingStore'

export const ThingsComponent = observe(props => {
  const store = useContext(thingStore)
  let things = store.things

  const handleChange = async change => {
    store.set('thing', change)
  }

  return (
    <section style={{ maxWidth: '100%' }}>
      <div className="columns is-multiline is-mobile">
        {things &&
          things.map(thing => {
            return (
              <ThingComponent
                handleChange={handleChange}
                color={props.color}
                id={thing.id}
                title={thing.title}
              />
            )
          })}
      </div>
    </section>
  )
})
```

```javascript
//ThingStore.js
import { createContext } from 'react'
import { action, decorate, observable } from 'mobx'

export class ThingStore {
  thing = ''

  set = (key, value) => {
    this[key] = value
  }
}

decorate(ThjngStore, {
  thing: observable,
  set: action,
})

export default createContext(new ThingStore())
```

### useState

```jsx
import React, { useContext, useState } from 'react'
import ThingStore from '../stores/ThingStore'

const UseTheState = () => {
  const [stateThing, setStateThing] = useState(false) // [state var, setter] = useState(initialState)
  return (
    <div>
      <button onClick={setStateThing}>click me</button>
    </div>
  )
}

const UseTheStore = () => {
  const thingStore = useContext(ThingStore)
  return (
    <div>
      <button onClick={store.setThing}></button>
    </div>
  )
```

## LOCAL TESTING

_Test Mobx by running Jest with Jasmine:_

`yarn test`

```javascript
it('clears checked todos', () => {
  const store = new TodoStore()
  store.createTodo('todo1')
  store.createTodo('todo2')
  store.createTodo('todo3')
  store.todos[1].complete = true
  store.todos[2].complete = true
  store.clearComplete()

  expect(store.todos.length).toBe(1)
  expect(store.todos[0].value).toBe('todo1')
})
```

_Test page copy using `jest-puppeteer`:_

```javascript
describe('Google', () => {
  beforeAll(async () => {
    await page.goto('https://google.com')
  })

  it('should display "google" text on page', async () => {
    await expect(page).toMatch('google')
  })
})
```

---

## FORKED CRA && REACT-SCRIPTS

https://www.npmjs.com/package/bulu-react-scripts

### Why

Create-react-app is a great tool but many times it doesn't cover every case as a project matures. At the time of writing, jest/puppeteer was having trouble parsing ES6 after something changed with a dev dependency (ESLint or Prettier, perhaps). We would have to edit `node_modules` which is not a reasonable option, or eject, which takes us out of the React development lifecycle and hinders longer term development tooling.

We have forked CRA and then published our own custom react-scripts:

https://www.npmjs.com/package/bulu-react-scripts

### How

#### Remove react-scrips from package.json and node_modules (already done in this repo)

Noted here as we may do it again in another repo. _Additionally the initial template can be modified to suit._

#### Edit `react-scripts` in our fork of `create-react-app`

`Starting Development Server` now says `Starting Bulu Gold Standard Development Server`

#### Publish bulu-react-scripts

- Register a user name and password at npmjs.org.
- `npm login`
- Make sure you have bumped the version up. The following command will fail and tell you so if you don't:
- `npm publish`
- Bump the bulu-react-scripts version in `gs`
- `yarn`

### Automate upstream?

https://github.com/wei/pull

https://github.com/apps/pull

---

## SHOPIFY THEME MANUAL DEPLOYMENT

1. **In this repo:** Tag: `git tag 3.0.0-rc.X`

2. Push to master: `git push remote/master 3.0.0-rc.X`

3. Change directory into the `disney-theme` repo `cd ../disney-theme`
   _They must be right next to one another in the file tree:_

   ```
   /bulu
      /disney-theme
      /backstage-disney
   ```

4. **In `disney-theme` repo:**
   Make sure you have themekit installed: https://shopify.github.io/themekit/
   `yarn && yarn deploy-dev-react`

5) Enjoy. _For best results apply twice daily, rinse, and repeat._

---

## CODE OF CONDUCT

- Don't play the blame game. We win as a team.
- Accept critique. We all want to get better.

