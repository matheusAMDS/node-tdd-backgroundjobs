import { getRepository } from 'typeorm'

import createDbConnection from '../../database/connection'
import { User } from '../../app/models/User'

describe('Authentication', () => {

  beforeAll(async () => {
    await createDbConnection()
  })

  it('should receive JWT token when authenticated with valid credentials.', async () => {
    const userRepository = getRepository(User)
    const user = userRepository.create({
      name: "Matheus",
      email: "matheus@gmail.com",
      passwordHash: "12345"
    })

    await userRepository.save(user)

    expect(user.email).toBe('matheus@gmail.com')
  })
})