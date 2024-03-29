import mongoose from 'mongoose'
import exchangePrice from './products'
import { countBy } from 'ramda'

/**
 * Get Insert function to upload data
 * @param {number} req The API request
 * @param {number} res The API response
 * @return {message} error or success
 */
export async function getInsert(req, res) {
  const { body } = req
  const Model = mongoose.model('Cart')

  const itemToSave = new Model(body)
  await itemToSave.save(function(err, data) {
    if (err) res.send(err)
    res.json({ message: 'New Item Created Successfully', data })
  })
}

/**
 * Get Update function to update existing data
 * @param {number} req The API request
 * @param {number} res The API response
 * @return {object} updated Object Data
 */
export async function getUpdate(req, res) {
  const { params: { id }, body } = req
  const Model = mongoose.model('Cart')

  const item = await Model.findOne({ _id: id })
  if (!item) res.status(200).send({ message: 'No record found' })

  await Model.updateMany({}, { $set: {
    id: item.id,
    products: body.products || item.products
  } })
  res.send(await Model.findOne({ _id: id }))
}

/**
 * Format Products Data function to format Products
 * for Carts checkout
 * @param {array} productsIds The array of product ids
 * @param {string} currency The currency string like : 'PLN, USD'
 * @return {array} updated carts by extended products data
 */
export default async function formatProductsData(productsIds, currency) {
  const ProductsModel = mongoose.model('Product')

  const mappedIds = productsIds.map((id) => new mongoose.Types.ObjectId(id))
  const productQuantities = countBy((x) => x)(mappedIds)

  const productsReturned = await ProductsModel.find({
    '_id': { $in: mappedIds }
  }, function(err, data) {
    if (err) return console.error(err)
    return data
  })

  productsReturned.map(function(product) {
    return product.quantity = productQuantities[product.id]
  })

  if (currency && currency != 'EUR') {
    const productPromise = productsReturned.map(async function(product) {
      const {
        exchangedPrice,
        exchangedCurrency
      } = await exchangePrice(product.price, currency)

      product.currency = exchangedCurrency
      product.price = exchangedPrice

      return product
    })
    await Promise.all(productPromise).then((res) => res)
  }
  return productsReturned
}
