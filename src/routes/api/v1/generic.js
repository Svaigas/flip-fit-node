import mongoose from 'mongoose'
import request from 'request-promise'
import exchangePrice from './products'

/**
 * Find by Id.
 * @param {number} req The API request
 * @param {number} res The API response
 */
export async function findById(req, res) {
  const { params: { id, type }, query: { currency } } = req

  const modelName = type.replace(/^./, type[0].toUpperCase())
  const Model = mongoose.model(modelName)

  const result = await Model.findById(id)
  if (result && modelName === 'Product' && currency && currency != 'EUR') {
    const {
      exchangedPrice,
      exchangedCurrency
    } = await exchangePrice(result.price, currency)

    result.currency = exchangedCurrency
    result.price = exchangedPrice
  }

  if (!result) {
    res.send({})
  } else {
    res.send(result)
  }
}

export async function getInsert(req, res) {
  const { params: { type } } = req
  console.log(req)

  const modelName = type.replace(/^./, type[0].toUpperCase())
  const Model = mongoose.model(modelName)

  //Model.create()

  res.send({})
}
