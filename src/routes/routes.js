import express from 'express'
const routerV1 = new express.Router()

import * as genericV1 from './api/v1/generic'

routerV1.get('/', function(req, res) {
  res.send('Birds home page')
})

// GET routes
routerV1.get('/:type', genericV1.findById)
routerV1.get('/:type/:id', genericV1.findById)

// POST routes

// PUT routes

// DELETE routes

module.exports = routerV1
