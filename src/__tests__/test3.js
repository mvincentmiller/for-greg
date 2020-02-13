import puppeteer from 'puppeteer'
const timeout = 12000
import { copy } from '../stores/copy.js'
import chalk from 'chalk'

const description = 'Account Page: go to '
const url = 'https://gs.bulu.io/app/#/login' //can also navigate to interal routes

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

    it(copyAssertion(), async () => {
      console.log(copyAssertion(description, url, copy.accountMessage))
      let text = await page.evaluate(() => document.body.textContent)
      expect(text).toContain(copy.accountMessage)
    })
  },
  timeout
)

// from the old App.test.js //
// describe('renders without crashing', () => {
//   test('we view the welcome h1 header', async () => {
//     let browser = await puppeteer.launch({
//       headless: true,
//     })
//     console.log('navigate to root and find class, h1 and copy')
//     let page = await browser.newPage()

//     await page.goto('http://localhost:3000')
//     await page.waitForSelector('.welcome-message')

//     const header = await page.$eval('h1', e => e.innerHTML)
//     expect(header).toEqual(copy.landingMessage)

//     browser.close()
//   }, 16000)
// })
