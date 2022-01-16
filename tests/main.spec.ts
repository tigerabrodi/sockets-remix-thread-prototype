import { test, expect } from '@playwright/test'
import { buildUserName } from './generate'

const baseUrl = 'http://localhost:3000/'

test('Complete real-time flow with two browsers.', async ({ browser }) => {
  const firstUser = buildUserName()
  const secondUser = buildUserName()

  const context = await browser.newContext()

  const pageOne = await context.newPage()
  const pageTwo = await context.newPage()

  await pageOne.goto(baseUrl)
  await pageTwo.goto(baseUrl)

  await pageOne.fill('input', firstUser.name)
  await pageTwo.fill('input', secondUser.name)

  await pageOne.click('button')
  await pageTwo.click('button')

  await expect(pageOne.locator('"Thread"')).toBeDefined()
  await expect(pageTwo.locator('"Thread"')).toBeDefined()

  await context.close()
})
