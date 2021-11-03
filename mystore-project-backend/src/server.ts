import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Logger } from 'tslog'
import cors from 'cors'

import product_routes from './handlers/product'
import user_routes from './handlers/user'
import order_routes from './handlers/order'

const app: express.Application = express()
const address = '0.0.0.0:3000'
const log: Logger = new Logger({ name: 'storeFront', type: 'json' })

app.use(bodyParser.json())
app.use(cors())

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello World!  This is the Storefront Backend web application!')
})

// define the routes for the app via the handlers
product_routes(app)
user_routes(app)
order_routes(app)

app.listen(3000, (): void => {
  log.info(`started app on: ${address}`)
})

export default app
