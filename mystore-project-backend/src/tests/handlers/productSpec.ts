import supertest from 'supertest'
import { Product } from '../../models/product'
import { User } from '../../models/user'
import app from '../../server'

const request = supertest(app)

describe('test product handler', () => {
  let newProduct: Product
  let newUser: User
  let token: string

  beforeAll(() => {
    newProduct = {
      name: 'Test Product 1',
      category: 'Test Product Category 1',
      url: 'http://some.domain.com/product1',
      description: 'Test Product 1',
      price: 1.00
    }
    newUser = {
      firstname: 'Test User',
      lastname: 'Product',
      password: 'product'
    }
  })

  it('create route not authorized when token not provided', async () => {
    const response = await request.post('/products').send(newProduct)
    expect(response.status).toBe(401)
  })

  it('create route succeeds with token provided', async () => {
    const newUserResponse = await request.post('/users/register').send(newUser)
    token = newUserResponse.body.token
    const response = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct)
    expect(response.status).toBe(200)
    expect(response.body.id).toBeTruthy()
  })

  it('show route succeeds', async () => {
    const newProductRes = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct)
    expect(newProductRes.status).toBe(200)
    expect(newProductRes.body.id).toBeTruthy()

    // show route succeeds with no token required
    const productId = newProductRes.body.id
    const response = await request.get('/products/' + productId + '/details')
    expect(response.status).toBe(200)
  })

  it('index route succeeds', async () => {
    const response = await request.get('/products')
    expect(response.status).toBe(200)
  })

  it('index route succeeds for specified category', async () => {
    const response = await request.get(
      '/products?category=' + newProduct.category
    )
    expect(response.status).toBe(200)
    expect(response.body.length).toEqual(2)
  })

  it('index route succeeds for unknown category', async () => {
    const response = await request.get('/products?category=unknown')
    expect(response.status).toBe(200)
    expect(response.body.length).toEqual(0)
  })

  it('checks create route for invalid payload', async () => {
    const invalidProduct = {
      someKey: 'someValue'
    }
    const response = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(invalidProduct)
    expect(response.status).toBe(400)
  })

  it('checks show route for missing ID', async () => {
    const response = await request.get('/products/details/')
    expect(response.status).toBe(404)
  })

  it('checks show route for invalid ID', async () => {
    const response = await request.get('/products/invalid/details')
    expect(response.status).toBe(400)
  })
})
