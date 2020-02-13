# Hybrid Custom React Checkout on Shopify

_coming soon: account_

## Create a Template

`pages.checkout.liquid`

### Create a Page

Under admin -> pages. Select the template `pages.checkout`

### Modify & Run `combine.sh`

Pattern match `checkout` instead of `account`. Change the bundle target to `pages.checkout.liquid`

**This script will now inject your production React bundle into `pages.checkout.liquid`.**

### Deploy the Shopify Theme

`yarn deploy-dev`

This copies your bundled template to the live Shopify instance.

## About Variants

In the Recharge example, you send Recharge the cart token via url params:

`window.location.href = "https://checkout.rechargeapps.com/r/checkout?myshopify_domain="+myshopify_domain+"&cart_token="+token+"&"+ga_linker+"&"+customer_param;`

In our Hybrid example, we will still have access to `window.model` and the selected variant should be there.
