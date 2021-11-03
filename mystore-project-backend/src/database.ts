import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config() // initializes the environment variables

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_USER,
  ENV
} = process.env

const client: Pool = new Pool({
  host: POSTGRES_HOST,
  database: ENV === 'dev' ? POSTGRES_DB : POSTGRES_TEST_DB,
  user: ENV === 'dev' ? POSTGRES_USER : POSTGRES_TEST_USER,
  password: POSTGRES_PASSWORD
})

export default client
