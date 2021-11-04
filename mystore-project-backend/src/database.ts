import dotenv from 'dotenv'
import pg from 'pg';
import * as c from './config'

dotenv.config() // initializes the environment variables

const { Pool } = pg;

const config = {
    host: c.config.host,
    port: c.config.port,
    database: c.config.database,
    user: c.config.username,
    password: c.config.password
}

const Client = new Pool(config);

export default Client
