import { build, fake } from '@jackfranklin/test-data-bot'

type AuthorName = {
  authorName: string
}

export const buildAuthorName = build<AuthorName>('AuthorName', {
  fields: {
    authorName: fake((faker) => faker.name.firstName()),
  },
})
