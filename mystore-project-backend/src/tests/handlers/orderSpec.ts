import supertest from 'supertest'
import { Product } from '../../models/product'
import { User } from '../../models/user'
import app from '../../server'

const request = supertest(app)

describe('test order handler', () => {
  let newUser: User
  let newUserOrderToken: string
  let token: string
  let userId: string
  let newProduct: Product
  let productId: string

  beforeAll(() => {
    newUser = {
      firstname: 'Test',
      lastname: 'User',
      password: 'password'
    }
    newProduct = {
      name: 'Test Product',
      category: 'Test Product Category',
      url: 'http://some.domain.com/test-product',
      description: 'Test Product',
      price: 100.00
    }
  })

  it('current order route not authorized when token not provided', async () => {
    const newUserRes = await request.post('/users/register').send(newUser)
    expect(newUserRes.status).toBe(200)
    expect(newUserRes.body.user.id).toBeTruthy()
    expect(newUserRes.body.token).toBeTruthy()

    token = newUserRes.body.token
    userId = newUserRes.body.user.id

    const response = await request.get('/users/' + userId + '/order')
    expect(response.status).toBe(401)
  })

  it('current order route succeeds with token provided', async () => {
    const newUserOrder = {
      firstname: 'Test User',
      lastname: 'Order',
      password: 'order'
    }
    const newUserRes = await request.post('/users/register').send(newUserOrder)
    expect(newUserRes.status).toBe(200)
    expect(newUserRes.body.user.id).toBeTruthy()
    expect(newUserRes.body.token).toBeTruthy()
    const response = await request
      .get('/users/' + newUserRes.body.user.id + '/order')
      .set('Authorization', 'Bearer ' + newUserRes.body.token)
    expect(response.status).toBe(200)
    expect(response.body.id).toBeTruthy()

    newUserOrderToken = newUserRes.body.token
    token = newUserRes.body.token
  })

  it('current order route not authorized when userId does not match in token provided', async () => {
    const response = await request
      .get('/users/' + userId + '/order')
      .set('Authorization', 'Bearer ' + token)
    expect(response.status).toBe(401)
  })

  it('user is able to add a product to current order', async () => {
    const loginRes = await request.post('/users/login').send(newUser)
    expect(loginRes.status).toBe(200)
    expect(loginRes.body.token).toBeTruthy()
    token = loginRes.body.token

    const addNewProductRes = await request
      .post('/products')
      .set('Authorization', 'Bearer ' + token)
      .send(newProduct)
    expect(addNewProductRes.status).toBe(200)
    expect(addNewProductRes.body.id).toBeTruthy()
    productId = addNewProductRes.body.id as string

    const addProductRes = await request
      .post('/users/' + userId + '/order/addProduct')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: productId, quantity: 1 })
    expect(addProductRes.status).toBe(200)
    expect(addProductRes.body.order.id).toBeTruthy()
    expect(addProductRes.body.order.status).toEqual(0)
    expect(addProductRes.body.order.products).toHaveSize(1)
  })

  it('adding the same product to current order increments its quantity value and does not create another entry', async () => {
    const addProductRes = await request
      .post('/users/' + userId + '/order/addProduct')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: productId, quantity: 1 })
    expect(addProductRes.status).toBe(200)
    expect(addProductRes.body.order.id).toBeTruthy()
    expect(addProductRes.body.order.status).toEqual(0)
    expect(addProductRes.body.order.products).toHaveSize(1)
    expect(addProductRes.body.order.products[0].quantity).toEqual(2)
  })

  it('adding a product to current order fails with invalid product ID parameter', async () => {
    const addProductRes = await request
      .post('/users/' + userId + '/order/addProduct')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: 'invalid', quantity: 1 })
    expect(addProductRes.status).toBe(400)
  })

  it('adding a product to current order fails with invalid quantity parameter', async () => {
    const addProductRes = await request
      .post('/users/' + userId + '/order/addProduct')
      .set('Authorization', 'Bearer ' + token)
      .send({ product_id: productId, quantity: '/bad' })
    expect(addProductRes.status).toBe(400)
  })

  it('adding a product to current order fails when userId does not match in token provided', async () => {
    const addProductRes = await request
      .post('/users/' + userId + '/order/addProduct')
      .set('Authorization', 'Bearer ' + newUserOrderToken)
      .send({ product_id: productId, quantity: 1 })
    expect(addProductRes.status).toBe(401)
  })
})
