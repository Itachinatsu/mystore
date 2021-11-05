import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Logger } from 'tslog'
import cors from 'cors'
import * as c from './config'

import product_routes from './handlers/product'
import user_routes from './handlers/user'
import order_routes from './handlers/order'

const app: express.Application = express()
const log: Logger = new Logger({ name: 'myStore', type: 'pretty' })

app.use(bodyParser.json())
app.use(cors())

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!  This is the MyStore Backend API!')
})

// define the routes for the app via the handlers
product_routes(app)
user_routes(app)
order_routes(app)

app.listen(c.config.app_port, (): void => {
  log.info(`started app on port: `+ c.config.app_port)
  log.info(`dbhost: `+ c.config.dbhost)
  log.info(`dbport: `+ c.config.dbport)
  log.info(`env: `+ c.config.env)
})

export default app
