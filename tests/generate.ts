import { build, fake } from '@jackfranklin/test-data-bot'

type UserName = {
  name: string
}

type Comment = {
  text: string
}

export const buildUserName = build<UserName>('UserName', {
  fields: {
    name: fake((faker) => faker.name.firstName()),
  },
})

export const buildComment = build<Comment>('Comment', {
  fields: {
    text: fake((faker) => faker.lorem.words(3)),
  },
})
