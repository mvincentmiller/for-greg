# What Makes a Gold Standard Site?

A "Gold Standard" Site is composed of many key technologies, optimizations and quality of life improvements over the old Shopify hosted Storefront sites.

The goal of the Gold Standard Project should be to do the following:

- Provide the Developer with up to 70% of the critical function of a Bulu subscription website already completed.
- Provide a template that is congruent with the default proposed SOW (State of work).
- Provide an up to date library of "functions" for Tech/Sales situational awareness.
- Provide a modular codebase to allow for client/Bulu flexibility
- Provide a platform for the tech team to continually improve site performance, accessibility ,metrics, and analytics.

These overall goals should inform the creation of new bespoke sites and should feed into the overall goal of reduced time to market for clients and increased overall quality of the digital product.

## Tool Anatomy

The Gold Standard template is composed of a few key tools that makeup the overall digital product. These tools are as follows.

- [React](../keyTools/react.md)
- [MobX](../keyTools/mobx.md)
- [graphQL](../keyTools/graphQl.md)

Although not a complete list of all the 3rd party (mostly Open Source) tools used in gold standard these are the main front end tools used to facilitate most of the critical look and function of a Gold Standard site. These **Key Tools** are detailed in their own section of this documentation complete with code examples and detailed links to their respective documentation.

## Layout Design

This Documentation is a small but important part in the overall **Gold Standard** suite another important part of the suite is the [Live Demo](http://gs.bulu.io/demo) this live demo is a large taste of the full suite of components that makeup the overall **Gold Standard** suite.

These components are grouped into containers that we call **Pages**. Bulu has identified that there are a few key pages that subscription sites require. These **Pages** may include but are not limited to.

- Landing Page
- Subscribe flow\*
- Checkout
- Account
- Contact Us
- About Us
- FAQs

_Depending on the needs of the client the Subscribe Flow may or may not be a standalone page. Keep in mind that this page includes complex logic and data flows and should be treated with proper care._

### Landing Page

A page that is first rendered when a user enters the site. Most likely this will be described as the **Home** page. Most of the components on this page will include Images and CTA's to entice the customer to buy the subscription product. Most of these sections are relatively easy to produce partially because the lack of complex logic and data flows required.

_This is not true for the Account, Subscribe flow, or Checkout witch all contain complex logic and should be considered as significant time investments._

### Contact Us

This page includes any of the channels where the client would want to do customer service. This could include an email address, phone numbers, or a customer service ticket form.

### FAQs

This page is a collection of some assumed frequently asked questions customers may have regarding the subscription program. These questions are loaded from a graphQL Api endpoint that is informed by a form on **Box Builder**.

This page can be configured on request from the client.

### About Us

This page is a description about the client or subscription program. This Page can be built with components already used on the Landing page to save time. There is not significant logic on this page and should only inform the user about the box or client.

###Checkout, Subscribe Flow, and Account

All of these pages have their own detailed pages that describe the logic and options associated with each.
