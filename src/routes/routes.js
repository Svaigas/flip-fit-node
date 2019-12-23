import express from 'express'
const routerV1 = new express.Router()
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../../documentation/swagger.json'

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

// GET routes
routerV1.get('/:type/:id', validateGETandDEL, genericV1.findById)

// POST routes
routerV1.post('/cart', validatePOSTcart, carts.getInsert)
routerV1.post('/product', validatePOSTproduct, products.getInsert)

// PUT routes
routerV1.put('/cart/:id', validatePUTcart, carts.getUpdate)
routerV1.put('/product/:id', validatePUTproduct, products.getUpdate)

// DELETE routes
routerV1.delete('/:type/:id', validateGETandDEL, genericV1.getRemove)

module.exports = routerV1
