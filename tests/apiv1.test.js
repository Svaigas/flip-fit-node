import mongoose from 'mongoose'
import request from 'request-promise'
import 'babel-polyfill'
const app = require('../src/index')
import { MongoMemoryServer } from 'mongodb-memory-server'
export const mongoServer = new MongoMemoryServer()

import { validProduct } from './staticData'

describe('Generic', () => {
  it('getInsert function. Should create new Product', async () => {
    const mongoUri = await mongoServer.getConnectionString()
    const Product = await mongoose.model('Product')

    const newProduct = new Product(validProduct)
    const saveProduct = await newProduct.save()

    const response = await request(`http://localhost:2150/v1/product/${saveProduct.id}`)
        .then(function(data) {
            return data
        })
        .catch((err) => err)

      expect(response.name).toBe(validProduct.name)
      expect(response.quantity).toBe(validProduct.quantity)
      expect(response.description).toBe(validProduct.description)
      expect(response.price).toBe(validProduct.price)

    await request(`http://localhost:2150/v1/product/${saveProduct.id}?currency=GBP`)
        .then(function(data) {
          expect(data.name).toBe(validProduct.name)
          expect(data.quantity).toBe(validProduct.quantity)
          expect(data.description).toBe(validProduct.description)
          expect(data.price).not.toBe(validProduct.price)
          expect(data.currency).toBe('abc')
        })
        .catch((err) => err)

    const Cart = await mongoose.model('Cart')

    const newCart = new Cart({ products: [saveProduct.id, saveProduct.id]})
    const saveCart = await newCart.save()
  })
})
