import mongoose from 'mongoose'
import exchangePrice from './products'
import formatProductsData from './carts'

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

  // Exchange the currency and price for specified currency
  if (result && modelName === 'Product' && currency && currency != 'EUR') {
    const {
      exchangedPrice,
      exchangedCurrency
    } = await exchangePrice(result.price, currency)

    result.currency = exchangedCurrency
    result.price = exchangedPrice
  }

  // Additional data collect for Cart
  if (result && modelName === 'Cart' && result.products.length) {
    result.products = await formatProductsData(result.products, currency)

    let cartPrice = 0
    result.products.forEach(
        (product) => cartPrice += (product.price * product.quantity)
    )
    result.cartPrice = cartPrice
  }

  if (!result) {
    res.status(200).send({ message: 'No record found' })
  } else {
    res.send(result)
  }
}

export async function getInsert(req, res) {
  const { params: { type }, body } = req

  const modelName = type.replace(/^./, type[0].toUpperCase())
  const Model = mongoose.model(modelName)

  const itemToSave = new Model(body)
  await itemToSave.save(function(err, data) {
    if (err) res.send(err)
    res.json({ message: 'New Item Created Successfully', data })
  })
}

export async function getRemove(req,res) {
  const { params: { id, type } } = req
  const modelName = type.replace(/^./, type[0].toUpperCase())
  const Model = mongoose.model(modelName)

  Model.deleteOne({ _id: id }, function(err) {
    if (err) res.send(err)
    res.json({ message: 'Item Successfully Deleted', id })
  })
}
