import { build, fake } from '@jackfranklin/test-data-bot'

type UserName = {
  name: string
}

export const buildUserName = build<UserName>('UserName', {
  fields: {
    name: fake((faker) => faker.name.firstName()),
  },
})
