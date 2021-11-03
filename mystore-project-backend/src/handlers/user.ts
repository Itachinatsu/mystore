import express, { Request, Response } from 'express'
import { User, UserStore } from '../models/user'
import jwt, { Secret } from 'jsonwebtoken'
import verifyAuthToken from '../utils/authentication'
import { Logger } from 'tslog'

const store = new UserStore()
const log: Logger = new Logger()

const createToken = (theUser: User): string => {
  // theUser at this point contains the encyrpted password value;
  // set the payload to the user's id, firstname and lastname for the JWT
  return jwt.sign(
    {
      user: {
        id: theUser.id,
        firstname: theUser.firstname,
        lastname: theUser.lastname
      }
    },
    process.env.TOKEN_SECRET as Secret
  )
}

// the handler function to create a user;
// a JWT for the user is returned upon successful creation/sign up/registration
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const userFirstName = req.body.firstname as string
    const userLastName = req.body.lastname as string
    const userPassword = req.body.password as string
    const newUser: User = {
      firstname: userFirstName,
      lastname: userLastName,
      password: userPassword
    }
    if (userFirstName && userLastName && userPassword) {
      // if user already exists, ensure creation fails;
      // ensure only one unique user for given parameters
      if (await store.authenticate(newUser)) {
        res.status(400).send()
      } else {
        const theUser = await store.create(newUser)
        res.json({ user: theUser, token: createToken(theUser) })
      }
    } else {
      res.status(400).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get all users
const index = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await store.index()
    res.json(users)
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to get a user
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id as string
    const uId = parseInt(userId)
    if (isNaN(uId)) {
      res.status(400).send()
    }
    const user = await store.show(uId)
    if (user) {
      res.json(user)
    } else {
      res.status(404).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// the handler function to authenticate/login a user;
// a JWT for the user is returned upon successful authentication/login
const authenticate = async (req: Request, res: Response): Promise<void> => {
  const user: User = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    password: req.body.password
  }
  try {
    const theUser = await store.authenticate(user)
    if (theUser) {
      res.json({ user: theUser, token: createToken(theUser) })
    } else {
      res.status(401).send()
    }
  } catch (error) {
    log.trace(error)
    res.status(500).send()
  }
}

// define the routes with the user handler functions
const user_routes = (app: express.Application): void => {
  app.post('/users/register', create)
  app.post('/users/login', authenticate)
  app.get('/users', verifyAuthToken, index)
  app.get('/users/:id/details', verifyAuthToken, show)
}

export default user_routes
