import { test, expect } from '@playwright/test'
import { buildComment } from './generate'

const baseUrl = 'http://localhost:3000/'

test('Complete real-time flow with two browsers.', async ({ browser }) => {
  const firstUserComment = buildComment()
  const secondUserComment = buildComment()

  const context = await browser.newContext()

  const pageOne = await context.newPage()
  const pageTwo = await context.newPage()

  await pageOne.goto(baseUrl)
  await pageTwo.goto(baseUrl)

  expect(pageOne.locator('"Thread"')).toBeDefined()
  expect(pageTwo.locator('"Thread"')).toBeDefined()

  // Add comment for first user
  await pageOne.fill('textarea', firstUserComment.text)
  await pageOne.locator('"Post"').click()

  // Comment should be the first one for both users
  await expect(pageOne.locator('li p')).toHaveText(firstUserComment.text)
  await expect(pageTwo.locator('li p')).toHaveText(firstUserComment.text)

  // Add comment for second user
  await pageTwo.fill('textarea', secondUserComment.text)
  await pageTwo.locator('"Post"').click()

  // Comment should be the second one for both users
  await expect(pageOne.locator('li p').nth(1)).toHaveText(
    secondUserComment.text
  )
  await expect(pageTwo.locator('li p').nth(1)).toHaveText(
    secondUserComment.text
  )

  await context.close()
})
