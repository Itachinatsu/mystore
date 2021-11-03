import { User, UserStore } from '../../models/user'

const store = new UserStore()

// this is the unit test for the User model
describe('User Model', () => {
  let user: User

  beforeAll(() => {
    user = {
      firstname: 'Test User',
      lastname: 'Admin',
      password: 'p@ssw0rd'
    }
  })

  it('should have a create method', () => {
    expect(store.create).toBeDefined()
  })

  it('should have an index method', () => {
    expect(store.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(store.show).toBeDefined()
  })

  it('should have an update method', () => {
    expect(store.update).toBeDefined()
  })

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined()
  })

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined()
  })

  it('create method should add a user', async () => {
    const result = await store.create(user)
    expect(result.firstname).toEqual(user.firstname)
    expect(result.lastname).toEqual(user.lastname)
  })

  it('authenticate method should verify a user', async () => {
    const result = await store.authenticate(user)
    expect(result).toBeDefined()
  })

  it('authenticate method should return null for an unknown user', async () => {
    const unknownUser = {
      firstname: 'Unknown',
      lastname: 'Unknown',
      password: 'unknown'
    }
    const result = await store.authenticate(unknownUser)
    expect(result).toBeNull()
  })

  it('authenticate method should return null for a user with an invalid password', async () => {
    const invalidPasswordUser = {
      firstname: 'Test User',
      lastname: 'Admin',
      password: 'invalid'
    }
    const result = await store.authenticate(invalidPasswordUser)
    expect(result).toBeNull()
  })

  it('index method should return users', async () => {
    await store.create(user)
    const result: User[] = await store.index()
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it('show method should return details of a user', async () => {
    const createResult = await store.create(user)
    const result = await store.show(createResult.id as number)
    expect(result.firstname).toEqual(user.firstname)
    expect(result.lastname).toEqual(user.lastname)
  })

  it('update method should update the product details', async () => {
    const createResult = await store.create(user)
    const updatedUser = {
      firstname: 'Test User',
      lastname: 'Updated',
      password: 'p@ssw0rd'
    }
    const result = await store.update(createResult.id as number, updatedUser)
    expect(result.id).toEqual(createResult.id)
    expect(result.firstname).toEqual(updatedUser.firstname)
    expect(result.lastname).toEqual(updatedUser.lastname)
  })

  it('delete method should remove the user', async () => {
    const createResult = await store.create(user)
    const result = await store.delete(createResult.id as number)
    expect(result).toBeUndefined()
  })
})
