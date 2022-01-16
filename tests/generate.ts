import { build, fake } from '@jackfranklin/test-data-bot'

type Comment = {
  text: string
}

export const buildComment = build<Comment>('Comment', {
  fields: {
    text: fake((faker) => faker.lorem.words(3)),
  },
})
