// @ts-ignore
import Client from '../database'

export type Product = {
  id?: number
  name: string
  price: number
  url: string
  description: string
  category: string
}

export class ProductStore {
  // method to create a Product
  async create(p: Product): Promise<Product> {
    try {
      const sql =
        'INSERT INTO products (name, price, url, description, category) VALUES($1, $2, $3, $4, $5) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()

      const result = await conn.query(sql, [p.name, p.price, p.url, p.description, p.category])

      const product: Product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`)
    }
  }

  // method to return a list of Products
  async index(category?: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      let sql = 'SELECT * FROM products'
      if (category) {
        sql += ' WHERE category = ' + "'" + category + "'"
      }
      const result = await conn.query(sql)
      const products: Product[] = result.rows
      conn.release()
      return products
    } catch (error) {
      throw new Error('Cannot get products: ' + error)
    }
  }

  // method to return details of a Product
  async show(id: number): Promise<Product> {
    try {
      const sql = 'SELECT * FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const product: Product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  // method to update details of a Product
  async update(id: number, p: Product): Promise<Product> {
    try {
      const sql =
        'UPDATE products SET name = ($2), price = ($3), category = ($4), url = ($5), description = ($6) WHERE id=($1) RETURNING *'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id, p.name, p.price, p.category, p.url, p.description])
      const product: Product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
  }

  // method to delete a specified Product
  async delete(id: number): Promise<Product> {
    try {
      const sql = 'DELETE FROM products WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const product: Product = result.rows[0]
      conn.release()
      return product
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`)
    }
  }
}
