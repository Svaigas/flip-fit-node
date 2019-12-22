import express from 'express'
const routerV1 = new express.Router()

import * as genericV1 from './api/v1/generic'
import * as carts from './api/v1/carts'
import * as products from './api/v1/products'

routerV1.get('/', function(req, res) {
  res.send('Birds home page')
})

// GET routes
routerV1.get('/:type', genericV1.findById)
routerV1.get('/:type/:id', genericV1.findById)

// POST routes
routerV1.post('/:type', genericV1.getInsert)

// PUT routes
routerV1.put('/cart/:id', carts.getUpdate)
routerV1.put('/product/:id', products.getUpdate)

// DELETE routes
routerV1.delete('/:type/:id', genericV1.getRemove)

module.exports = routerV1
