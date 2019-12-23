import express from 'express'
const routerV1 = new express.Router()
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../documentation/swagger.json'
import jwt from 'jsonwebtoken'

import {
  validateGETandDEL,
  validatePOSTcart,
  validatePOSTproduct,
  validatePUTcart,
  validatePUTproduct
} from './validators'

import * as genericV1 from './api/v1/generic'
import * as carts from './api/v1/carts'
import * as products from './api/v1/products'

routerV1.use('/api-docs', swaggerUi.serve)
routerV1.get('/api-docs', swaggerUi.setup(swaggerDocument))

routerV1.get('/', function(req, res) {
  res.send('\uD83C\uDF85 Ho ho ho! \uD83C\uDF84')
})

routerV1.get('/login', (req,res) => {
  const user = {
    id: 1,
    username: 'mateuszadamiec',
    email: 'adamiecmateusz@wp.pl'
  }
  jwt.sign({ user }, 'secret', { expiresIn: '30m' }, (err, token) => {
    res.json({ token })
  })
})

// GET routes
routerV1.get('/:type/:id', verifyToken, validateGETandDEL, genericV1.findById)

// POST routes
routerV1.post('/cart', verifyToken, validatePOSTcart, carts.getInsert)
routerV1.post('/product', verifyToken, validatePOSTproduct, products.getInsert)

// PUT routes
routerV1.put('/cart/:id', verifyToken, validatePUTcart, carts.getUpdate)
routerV1.put('/product/:id', verifyToken, validatePUTproduct, products.getUpdate)

// DELETE routes
routerV1.delete('/:type/:id', verifyToken, validateGETandDEL, genericV1.getRemove)

/**
 * Verify Token
 * @param {number} req The API request
 * @param {number} res The API response
 * @param {number} next The API next to proceed
 */
export function verifyToken(req, res, next) {
  const bearerHead = req.headers['authorization']
  if (typeof bearerHead !== 'undefined') {
    const bearerToken = bearerHead.split(' ')[1]
    req.token = bearerToken
    next()
  } else {
    res.sendStatus(403)
  }
}

module.exports = routerV1
