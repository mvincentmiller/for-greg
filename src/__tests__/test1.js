//import { AxePuppeteer } from 'axe-puppeteer'

import puppeteer from 'puppeteer'
const timeout = 12000
import { copy } from '../stores/copy.js'
import chalk from 'chalk'

const description = 'Home Page: go to '
const url = 'https://gs.bulu.io/app/#/'

const copyAssertion = (d, url, c) => {
  return description + chalk.magenta(url) + ' and find ' + chalk.magenta(c)
}
describe(
  description,
  () => {
    beforeAll(async () => {
      let browser = await puppeteer.launch({
        headless: true,
      })
      global.page = await browser.newPage()
      await page.goto(url)
    }, timeout)

    afterAll(async () => {
      await page.close()
    })

    // it('should be accessible', async () => {

    //     const browser = await puppeteer.launch()
    //     const page = await browser.newPage()
    //     await page.setBypassCSP(true)

    //     await page.goto('https://www.w3.org/WAI/demos/bad/after/home.html')

    //     const results = await new AxePuppeteer(page).analyze()

    //     console.log(results)

    //     await page.close()
    //     await browser.close()

    // })

    it('should be running HTTPS', async () => {
      expect(url).toEqual('https://gs.bulu.io/app/#/')
    })

    it(copyAssertion(), async () => {
      console.log(copyAssertion(description, url, copy.landingMessage))

      await page.goto(url)
      //      await page.waitForSelector('.welcome-message')

      const header = await page.$eval('h1.is-size-1', e => e.innerHTML)
      expect(header).toEqual(copy.landingMessage)
    })
  },
  timeout
)
