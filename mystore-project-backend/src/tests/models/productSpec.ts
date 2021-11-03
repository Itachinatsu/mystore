import { Product, ProductStore } from '../../models/product'

const store = new ProductStore()

// this is the unit test for the Product model
describe('Product Model', () => {
  let product: Product

  beforeAll(() => {
    product = {
      name: 'Product100',
      category: 'product-category-100',
      url: 'http://some.domain.com/product-100',
      description: 'Product 100',
      price: 100.00
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

  it('create method should add a product', async () => {
    const result: Product = await store.create(product)
    expect(result.name).toEqual(product.name)
    expect(result.url).toEqual(product.url)
    expect(result.description).toEqual(product.description)
    expect(result.price == product.price).toBeTruthy()
    expect(result.category).toEqual(product.category)
    expect(result.id).toBeTruthy()
  })

  it('index method should return products', async () => {
    const result: Product[] = await store.index()
    expect(result.length).toBeGreaterThanOrEqual(1)
  })

  it('index method should return products for a given category', async () => {
    const result: Product[] = await store.index('product-category-100')
    expect(result.length).toEqual(1)
  })

  it('index method should return zero products for an unknown given category', async () => {
    const result: Product[] = await store.index('unknown')
    expect(result.length).toEqual(0)
  })

  it('show method should return details of a product', async () => {
    const createResult: Product = await store.create(product)
    const result = await store.show(createResult.id as number)
    expect(result.id).toEqual(createResult.id)
    expect(result.name).toEqual(createResult.name)
    expect(result.price == createResult.price).toBeTruthy()
    expect(result.url).toEqual(createResult.url)
    expect(result.description).toEqual(createResult.description)
    expect(result.category).toEqual(createResult.category)
  })

  it('update method should update the product details', async () => {
    const createResult: Product = await store.create(product)
    const updatedProduct: Product = {
      name: 'Product100updated',
      category: 'Product100category',
      url: 'http://some.domain.com/product100',
      description: 'Product 100 updated',
      price: 10.00
    }
    const result: Product = await store.update(createResult.id as number, updatedProduct)
    expect(result.id).toEqual(createResult.id)
    expect(result.name).toEqual(updatedProduct.name)
    expect(result.url).toEqual(updatedProduct.url)
    expect(result.description).toEqual(updatedProduct.description)
    expect(result.price == updatedProduct.price).toBeTruthy()
    expect(result.category).toEqual(updatedProduct.category)
  })

  it('delete method should remove the product', async () => {
    const createResult: Product = await store.create(product)
    const result = await store.delete(createResult.id as number)
    expect(result).toBeUndefined()
  })
})
