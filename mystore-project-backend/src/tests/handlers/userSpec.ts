import supertest from 'supertest'
import { User } from '../../models/user'
import app from '../../server'

const request = supertest(app)

describe('test user handler', () => {
  let newUser: User
  let token: string

  beforeAll(() => {
    newUser = {
      firstname: 'Test User',
      lastname: 'Create',
      password: 'create'
    }
  })

  it('create route succeeds', async () => {
    const response = await request.post('/users/register').send(newUser)
    expect(response.status).toBe(200)
    expect(response.body.user.id).toBeTruthy()
    expect(response.body.token).toBeTruthy()
  })

  it('authenticate route succeeds', async () => {
    const response = await request.post('/users/login').send(newUser)
    expect(response.status).toBe(200)
    expect(response.body.token).toBeTruthy()
  })

  it('show route not authorized when token not provided', async () => {
    const newUserShow = {
      firstname: 'Test User',
      lastname: 'Show',
      password: 'show'
    }
    const newUserRes = await request.post('/users/register').send(newUserShow)
    expect(newUserRes.status).toBe(200)
    expect(newUserRes.body.user.id).toBeTruthy()
    const userId = newUserRes.body.user.id
    const response = await request.get('/users/' + userId + '/details')
    expect(response.status).toBe(401)
  })

  it('show route succeeds with token provided', async () => {
    const newUserShow = {
      firstname: 'Test User',
      lastname: 'Show Token',
      password: 'token'
    }
    const newUserRes = await request.post('/users/register').send(newUserShow)
    expect(newUserRes.status).toBe(200)
    expect(newUserRes.body.user.id).toBeTruthy()
    expect(newUserRes.body.token).toBeTruthy()
    token = newUserRes.body.token
    const userId = newUserRes.body.user.id
    const response = await request
      .get('/users/' + userId + '/details')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('index route not authorized when token not provided', async () => {
    const response = await request.get('/users')
    expect(response.status).toBe(401)
  })

  it('index route succeeds with token provided', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(200)
  })

  it('checks create route for invalid payload', async () => {
    const invalidUser = {
      someKey: 'someValue'
    }
    const response = await request.post('/users/register').send(invalidUser)
    expect(response.status).toBe(400)
  })

  it('checks create route for already existing user', async () => {
    const response = await request.post('/users/register').send(newUser)
    expect(response.status).toBe(400)
  })

  it('checks show route for missing ID', async () => {
    const response = await request
      .get('/users/details/')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(404)
  })

  it('checks show route for invalid ID', async () => {
    const response = await request
      .get('/users/invalid/details')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(400)
  })
})
