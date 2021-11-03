// @ts-ignore
import Client from '../database'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env

export type User = {
  id?: number
  firstname: string
  lastname: string
  password: string
}

const pepper = BCRYPT_PASSWORD
const saltRounds = SALT_ROUNDS

export class UserStore {
  // method to create a User
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql =
        'INSERT INTO users (firstname, lastname, password) VALUES($1, $2, $3) RETURNING *'

      // hash, salt and pepper the password to avoid storing plain text passwords in the database
      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      )

      const result = await conn.query(sql, [u.firstname, u.lastname, hash])
      const user: User = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(
        `Unable to create user (${u.firstname} ${u.lastname}): ${error}`
      )
    }
  }

  // method to return a list of Users
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql = 'SELECT * FROM users'
      const result = await conn.query(sql)
      const users: User[] = result.rows
      conn.release()
      return users
    } catch (error) {
      throw new Error('Cannot get users: ' + error)
    }
  }

  // method to return details of a User
  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const user: User = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`)
    }
  }

  // method to update details of a User
  async update(id: number, u: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET firstname = ($2), lastname = ($3), password = ($4) WHERE id=($1) RETURNING *'

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(saltRounds as string)
      )

      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id, u.firstname, u.lastname, hash])
      const user: User = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`Could not find user ${id}. Error: ${error}`)
    }
  }

  // method to delete a specified User
  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)'
      // @ts-ignore
      const conn = await Client.connect()
      const result = await conn.query(sql, [id])
      const user: User = result.rows[0]
      conn.release()
      return user
    } catch (error) {
      throw new Error(`Could not delete user ${id}. Error: ${error}`)
    }
  }

  // method to authenticate validity of a specified User (check if specified User exists)
  async authenticate(u: User): Promise<User | null> {
    let theUser = null
    try {
      // @ts-ignore
      const conn = await Client.connect()
      const sql =
        'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)'
      const result = await conn.query(sql, [u.firstname, u.lastname])

      if (result.rows.length) {
        const user: User = result.rows[0]

        // validate the hashed password
        if (bcrypt.compareSync(u.password + pepper, user.password)) {
          theUser = user
        }
      }
      conn.release()
    } catch (error) {
      throw new Error(
        'Unable to verify user: ' + JSON.stringify(u) + ', ' + error
      )
    }
    return theUser
  }
}
