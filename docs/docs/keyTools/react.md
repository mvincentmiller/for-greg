## What is React?

React is a framework developed by Facebook to build out their web applications. React is a **Web Framework** and includes many tools to help manage scaleable web applications. This tool has been battle tested by not only Facebook and it's massive web properties but also by other entities like Disney, Nike, etc (There are a few more). This ensures that Bulu continues to stay competitive and up to modern web standards.

##Components

React introduces that scaleability with **React components**. React Components are modular sections of logic and HTML markup that can be seamlessly imported and composed into other **React Components**. This meaning: a site is built out of these components like each nesting doll in a "Russian Nesting Doll". One large container component could contain other containers or individual react components.

As illustrated in the following code snippet the Gold Standard base code is divided up into React components. These components are then grouped together and nested in container components that then may be grouped or rendered on a specific page route.

```jsx
export const Routes = observer(props => {
  const store = useContext(AccountStore)
  return (
    <main>
      <Notify />
      <Switch>
        <Route exact path="/" component={LandingContainer} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
```

As seen here in the`<Routes/>` component: each "page" is rendered from a parent component. On line 7 the application is loading the `<LandingContainer/>` component on the `/` route. This component is what a user would see when landing the "Home" page of the site. Every component and section included in the `<LandingContainer/>` will also be rendered when `/`is loaded.

```jsx
/**
 * Landing Container
 *
 * Contains the page Landing Components.
 *
 */

const LandingCopy = {
  title: 'BUILD YOUR BOX.',
}

export const LandingContainer = observer(props => {
  return (
    <div>
      <LandingHeader title={LandingCopy.title} />
      <LandingInfo />

      <SubscribeVertical />

```

In the above example a code snippet for `<LandingContainer/>` is shown. `<LandingHeader/>`, `<LandingInfo/>`,`<SubscribeVertical/>` all components that are contained within the LandingContainer will be rendered in the order they appear.

## Props

This is all very useful however pay careful attention to `<LandingHeader/>`. Landing header has an additional property `title` this is what we call a **prop**.

A prop is data passed into a component from it's parent. In this instance we have a constant `LandingCopy` defined above with that object has a member called `title` as well and contains the string `BUILD YOUR BOX.`

```jsx
export const LandingHeader = observer(props => (
  <div
    className="landingHeader"
    style={{
      minHeight: '65vh',
      backgroundImage: 'url("boxesbanner.svg")',
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    }}
  >
    <LandingCallout title={props.title} />
    <VideoBanner />
    <div className="navtop">
      <NavBar />
    </div>
  </div>
))
```

In the code example above this string is passed in as `props.title` a member of the `props` object. It is further passed to another component `<LandingCallout/>` and then finally rendered here:

```jsx
const LandingCallout = props => {
  return (
    <div>
      <div className="callout">
        <h1>{props.title}</h1>
        <h3 className="welcome-message">{copy.landingMessage}</h3>
        <button
          className="button is-primary"
          onClick={() => (window.location.hash = '/subscribe/one')}
        >
          3 EASY STEPS
        </button>
      </div>
    </div>
  )
}
```

On line 5 `props.title` is finally used rendered in large text in an `<h1>` tag.

**Props** are a super useful tool provided by React and is not the only tool provided by this great and versatile framework. For a more in-depth look at React and its features please refer to the [React Documentation]().

### Why use React in Gold Standard

As stated before **React** scales. Something that was hard to do with Bulu's existing solution the default Shopify Storefront. While perporting to be scaleable and easy to use the default Shopify template would often while seeming easy to use and configurable in theory would end up being a mess when client would want something slightly outside of the default capability. When wanting to scale past one developer working on one Shopify site at a time it was simply not possible.
