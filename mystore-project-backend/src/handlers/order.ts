import express, { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'
import { UserStore } from '../models/user'
import { ProductStore } from '../models/product'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { Logger } from 'tslog'

const orderStore = new OrderStore()
const userStore = new UserStore()
const productStore = new ProductStore()
const log: Logger = new Logger()

function verifyAuthTokenForUser(req: Request, userId: string) {
  const authorizationHeader = req.headers.authorization as string
  const token = authorizationHeader.split(' ')[1]
  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as Secret
  ) as JwtPayload
  if (decoded.user.id !== parseInt(userId)) {
    throw new Error('User id does not match!')
  }
}

// the handler function to get a user's current order
const currentOrder = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id as string

  // ensure that the order is retrieved for the user identified in the JWT
  try {
    verifyAuthTokenForUser(req, userId)
  } catch (error) {
    res.status(401).send()
    return
  }
  try {
    const uId = parseInt(userId)
    if (isNaN(uId)) {
      res.status(400).send()
    }

    // ensure the user exists
    const user = await userStore.show(uId)
    if (user) {
      const order = await orderStore.currentOrder(uId)
      res.json(order)
    } else {
      res.status(400).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to add a product to a user's current order
const addProductToOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id as string
  const productId = req.body.product_id as string
  const quantity = req.body.quantity as string

  // ensure that the order is retrieved for the user identified in the JWT
  try {
    verifyAuthTokenForUser(req, userId)
  } catch (error) {
    res.status(401).send()
    return
  }
  try {
    const uId = parseInt(userId)
    const pId = parseInt(productId)
    const q = parseInt(quantity)
    if (isNaN(uId) || isNaN(pId) || isNaN(q)) {
      res.status(400).send()
    }

    // ensure the user exists
    const user = await userStore.show(uId)
    if (user) {
      // ensure the product exists
      const product = await productStore.show(pId)
      if (product) {
        const order = await orderStore.addProductToOrder(uId, pId, q)
        res.json({ order: order })
      } else {
        res.status(400).send()
      }
    } else {
      res.status(400).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to add products to a user's new order
const createNewOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id as string

  // ensure that the order is retrieved for the user identified in the JWT
  try {
    verifyAuthTokenForUser(req, userId)
  } catch (error) {
    res.status(401).send()
    return
  }

  try {
    const productsToAdd = req.body.products
    if (productsToAdd) {
      const uId = parseInt(userId)
      if (isNaN(uId)) {
        res.status(400).send()
      } else {
        // ensure the user exists
        const user = await userStore.show(uId)
        if (user) {
          let newOrder: Order = await orderStore.newOrder(uId)
          const oid: number = newOrder.id as number
          for (let index = 0; index < productsToAdd.length; index++) {
            const aProduct = productsToAdd[index];
            const productId = aProduct.product_id as string
            const quantity = aProduct.quantity as string

            const pId = parseInt(productId)
            const q = parseInt(quantity)
            if (isNaN(pId) || isNaN(q)) {
              res.status(400).send()
              break
            }

            // ensure the product exists
            const productExists = await productStore.show(pId)
            if (productExists) {
              // get the updated order after product is added
              newOrder = await orderStore.addProduct(oid, pId, q)
            }
          } //for-loop

          res.json({ order: newOrder })
        } else {
          res.status(400).send()
        }
      }
    } else {
      res.status(400).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get details for a specific order and user
const getOrderForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.userId as string
  // ensure that the order is retrieved for the user identified in the JWT
  try {
    verifyAuthTokenForUser(req, userId)
  } catch (error) {
    res.status(401).send()
    return
  }

  try {
    const uId = parseInt(userId)
    if (isNaN(uId)) {
      res.status(400).send()
    } else {
      // ensure the user exists
      const user = await userStore.show(uId)
      if (user) {
        const orderId = req.params.orderId as string
        const oId = parseInt(orderId)
        if (isNaN(oId)) {
          res.status(400).send()
        } else {
          // get the specified order for the user
          const order = await orderStore.getOrderForUser(oId, uId)
          if (order) {
            res.json({ order: order })
          } else {
            res.status(400).send()
          }
        }
      } else {
        res.status(400).send()
      }
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get details for a specific order and user
const getOrdersForUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const userId = req.params.id as string

  // ensure that the orders are retrieved for the user identified in the JWT
  try {
    verifyAuthTokenForUser(req, userId)
  } catch (error) {
    res.status(401).send()
    return
  }

  try {
    const uId = parseInt(userId)
    if (isNaN(uId)) {
      res.status(400).send()
    } else {
      // ensure the user exists
      const user = await userStore.show(uId)
      if (user) {
        // get the orders for the specified user
        const orders: Order[] = await orderStore.getOrdersForUser(uId)
        const ordersRes = []
        for (let index = 0; index < orders.length; index++) {
          const anOrder = orders[index];
          ordersRes.push({ order: anOrder })
        }
        res.json(ordersRes)
      } else {
        res.status(400).send()
      }
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// define the routes with the order handler functions
const order_routes = (app: express.Application): void => {
  app.get('/users/:id/order', currentOrder)
  app.post('/users/:id/order/addProduct', addProductToOrder)
  app.post('/users/:id/order/new', createNewOrder)
  app.get('/users/:userId/order/:orderId', getOrderForUser)
  app.get('/users/:id/orders', getOrdersForUser)
}

export default order_routes
