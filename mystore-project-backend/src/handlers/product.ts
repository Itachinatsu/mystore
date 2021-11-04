import express, { Request, Response } from 'express'
import { Product, ProductStore } from '../models/product'
import verifyAuthToken from '../utils/authentication'
import { Logger } from 'tslog'

const log: Logger = new Logger()

const store = new ProductStore()

// the handler function to create a product
const create = async (req: Request, res: Response): Promise<void> => {
  log.info('product:create')
  try {
    const productName = req.body.name as string
    const productCategory = req.body.category as string
    const productUrl = req.body.url as string
    const productDescription = req.body.description as string
    const productPrice = req.body.price as number
    if (productName && productUrl && productDescription && productPrice) {
      const newProduct: Product = {
        name: productName,
        category: productCategory,
        url: productUrl,
        description: productDescription,
        price: productPrice
      }
      const product = await store.create(newProduct)
      log.debug(JSON.stringify(product))
      res.json(product)
    } else {
      res.status(400).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get all products
const index = async (req: Request, res: Response): Promise<void> => {
  log.info('product:index')
  try {
    const products = await store.index(req.query.category as string)
    log.debug(JSON.stringify(products))
    res.json(products)
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get a product
const show = async (req: Request, res: Response): Promise<void> => {
  log.info('product:show')
  try {
    const productId = req.params.id as string
    const pId = parseInt(productId)
    if (isNaN(pId)) {
      res.status(400).send()
    }
    const product = await store.show(pId)
    if (product) {
      log.debug(JSON.stringify(product))
      res.json(product)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// define the routes with the product handler functions
const product_routes = (app: express.Application): void => {
  app.post('/products', verifyAuthToken, create)
  app.get('/products', index)
  app.get('/products/:id/details', show)
}

export default product_routes
