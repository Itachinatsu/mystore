// @ts-ignore
import Client from '../database'

export type OrderProduct = {
  id?: number
  product_id: number
  quantity: number
}

export type Order = {
  id?: number
  user_id: number
  status: number
  products: OrderProduct[]
}

export class OrderStore {
  // method to get the active Order for the specified user
  async currentOrder(userId: number): Promise<Order> {
    try {
      let theOrder: Order

      // @ts-ignore
      const conn = await Client.connect()

      // get the user's active order
      const currentOrderSql =
        'SELECT * FROM orders WHERE user_id=($1) AND status=0'
      const currentOrderResult = await conn.query(currentOrderSql, [userId])
      const currentOrder: Order = currentOrderResult.rows[0]
      if (currentOrder) {
        theOrder = currentOrder
      } else {
        // create a new order for the user and set to active status:  0 = active status, 1 = completed status
        const newOrderSql =
          'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
        const newOrderResult = await conn.query(newOrderSql, [userId, 0])
        const newOrder: Order = newOrderResult.rows[0]
        theOrder = newOrder
      }
      // get the products associated with the current order
      const productsInOrderSql =
        'SELECT product_id, quantity FROM order_products WHERE order_id=($1)'
      const productsInOrderResult = await conn.query(productsInOrderSql, [
        theOrder.id
      ])
      const productsInOrder: OrderProduct[] = productsInOrderResult.rows
      theOrder.products = productsInOrder

      conn.release()
      return theOrder
    } catch (err) {
      throw new Error(
        `Could not get current order for user ${userId}. Error: ${err}`
      )
    }
  }

  // method to add a product to an active order for the specified user
  async addProductToOrder(
    userId: number,
    productId: number,
    quantity: number
  ): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect()

      // get the user's current order
      const currentOrder = await this.currentOrder(userId)

      // check if product entry already exists in the order
      const productInOrderSql =
        'SELECT id, product_id, quantity FROM order_products WHERE order_id=($1) AND product_id=($2)'
      const productInOrderResult = await conn.query(productInOrderSql, [
        currentOrder.id,
        productId
      ])
      const productInOrder: OrderProduct = productInOrderResult.rows[0]

      if (productInOrder) {
        // increment the quantity value of the product entry
        const sql = 'UPDATE order_products SET quantity = ($1) WHERE id=($2)'
        await conn.query(sql, [
          productInOrder.quantity + quantity,
          productInOrder.id
        ])
      } else {
        // add the product to the order with the given quantity value
        const sql =
          'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)'
        await conn.query(sql, [currentOrder.id, productId, quantity])
      }

      conn.release()

      // return the updated order
      return await this.currentOrder(userId)
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to current order for user ${userId}. Error: ${err}`
      )
    }
  }

  // method to create a new Order for the specified user
  async newOrder(userId: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect()

      // create a new order for the user and set to active status:  0 = active status, 1 = completed status
      const newOrderSql =
        'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *'
      const newOrderResult = await conn.query(newOrderSql, [userId, 0])
      const newOrder: Order = newOrderResult.rows[0]

      conn.release()
      return newOrder
    } catch (err) {
      throw new Error(
        `Could not create new order for user ${userId}. Error: ${err}`
      )
    }
  }

  // method to add a Product to the specified order
  async addProduct(
    orderId: number,
    productId: number,
    quantity: number
  ): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect()

      // check if product entry already exists in the order
      const productInOrderSql = 'SELECT id, product_id, quantity FROM order_products WHERE order_id=($1) AND product_id=($2)'
      const productInOrderResult = await conn.query(productInOrderSql, [orderId, productId])
      const productInOrder: OrderProduct = productInOrderResult.rows[0]

      if (productInOrder) {
        // increment the quantity value of the product entry
        const sql = 'UPDATE order_products SET quantity = ($1) WHERE id=($2)'
        await conn.query(sql, [productInOrder.quantity + quantity, productInOrder.id])
      } else {
        // add the product to the order with the given quantity value
        const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3)'
        await conn.query(sql, [orderId, productId, quantity])
      }

      // return the updated order
      const currentOrderSql = 'SELECT * FROM orders WHERE id=($1)'
      const currentOrderResult = await conn.query(currentOrderSql, [orderId])
      const updatedOrder: Order = currentOrderResult.rows[0]

      // get the products associated with the specified order
      const productsInOrderSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)'
      const productsInOrderResult = await conn.query(productsInOrderSql, [orderId])
      const productsInOrder: OrderProduct[] = productsInOrderResult.rows
      updatedOrder.products = productsInOrder

      conn.release()

      // return the updated order
      return updatedOrder
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}. Error: ${err}`
      )
    }
  }

  // method to get details of the specified order and user
  async getOrderForUser(orderId: number, userId: number): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect()

      // return the specified order
      const currentOrderSql = 'SELECT * FROM orders WHERE id=($1) AND user_id=($2)'
      const currentOrderResult = await conn.query(currentOrderSql, [orderId, userId])
      const theOrder: Order = currentOrderResult.rows[0]
      if (theOrder) {
        // get the products associated with the specified order
        const productsInOrderSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)'
        const productsInOrderResult = await conn.query(productsInOrderSql, [orderId])
        const productsInOrder: OrderProduct[] = productsInOrderResult.rows
        theOrder.products = productsInOrder
      }
      conn.release()
      return theOrder
    } catch (err) {
      throw new Error(
        `Could not get order ${orderId}. Error: ${err}`
      )
    }
  }

  // method to get orders the specified user
  async getOrdersForUser(userId: number): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()

      // get the orders placed by the specified user
      const currentOrderSql = 'SELECT * FROM orders WHERE user_id=($1) ORDER BY id DESC'
      const currentOrderResult = await conn.query(currentOrderSql, [userId])
      const theOrders: Order[] = currentOrderResult.rows
      for (let index = 0; index < theOrders.length; index++) {
        const theOrder: Order = theOrders[index];

        // get the products associated with the order
        const productsInOrderSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=($1)'
        const productsInOrderResult = await conn.query(productsInOrderSql, [theOrder.id])
        const productsInOrder: OrderProduct[] = productsInOrderResult.rows
        theOrder.products = productsInOrder
      }

      conn.release()
      return theOrders
    } catch (err) {
      throw new Error(
        `Could not get orders for user ${userId}. Error: ${err}`
      )
    }
  }
}
