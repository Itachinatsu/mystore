import { Order, OrderStore } from '../../models/order'
import { Product, ProductStore } from '../../models/product'
import { User, UserStore } from '../../models/user'

const userStore = new UserStore()
const orderStore = new OrderStore()
const productStore = new ProductStore()

// this is the unit test for the Order model
describe('Order Model', () => {
  let user: User

  beforeAll(() => {
    // mock the user
    user = {
      firstname: 'Test User',
      lastname: 'Admin',
      password: 'p@ssw0rd'
    }
  })

  it('should have a currentOrder method', () => {
    expect(orderStore.currentOrder).toBeDefined()
  })

  it('should have a addProductToOrder method', () => {
    expect(orderStore.addProductToOrder).toBeDefined()
  })

  it('currentOrder method should get the active order for the user', async () => {
    const theUser = await userStore.create(user)
    const theUserId = theUser.id as number

    // get the current order for the user
    const order = {
      user_id: theUserId,
      status: 0
    }
    const result = await orderStore.currentOrder(theUserId)
    expect(result.status).toEqual(order.status)
  })

  it('addProductToOrder method should add a product to the active order for the user', async () => {
    const aProduct = {
      name: 'ProductToAdd',
      category: 'product-category',
      url: 'http://some.domain.com/product-to-add',
      description: 'Product To Add',
      price: 100.00
    }
    const userAddProductToOrder = {
      firstname: 'Test User',
      lastname: 'AddProduct',
      password: 'addproduct'
    }
    const addProductResult: Product = await productStore.create(aProduct)
    const productId = addProductResult.id as number
    const theUser: User = await userStore.create(userAddProductToOrder)
    const theUserId = theUser.id as number
    const result: Order = await orderStore.addProductToOrder(
      theUserId,
      productId,
      1
    )
    expect(result.status).toEqual(0)
    expect(result.products.length).toEqual(1)
  })
})
