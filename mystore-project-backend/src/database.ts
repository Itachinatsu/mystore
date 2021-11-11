import dotenv from 'dotenv'
import pg from 'pg';
import * as c from './config'
//import { Logger } from 'tslog'

//const log: Logger = new Logger()

dotenv.config() // initializes the environment variables

const { Pool } = pg

const config = {
    host: c.config.dbhost,
    port: c.config.dbport,
    database: c.config.database,
    user: c.config.username,
    password: c.config.password
}

//log.debug('database:config='+JSON.stringify(config))

const Client = new Pool(config)

export default Client
