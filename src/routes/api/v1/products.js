import request from 'request-promise'
import mongoose from 'mongoose'

/**
 * Get Insert function to upload data
 * @param {number} req The API request
 * @param {number} res The API response
 * @return {message} error or success
 */
export async function getInsert(req, res) {
  const { body } = req
  const Model = mongoose.model('Product')

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
  const Model = mongoose.model('Product')

  const item = await Model.findOne({ _id: id })
  if (!item) res.status(200).send({ message: 'No record found' })

  await Model.updateMany({}, { $set: {
    id: item.id,
    name: body.name || item.name,
    quantity: body.quantity || item.quantity,
    description: body.description || item.description,
    price: body.price || item.price
  } })
  res.send(await Model.findOne({ _id: id }))
}

/**
 * Exchange Price function to format Products Prices into
 * requested currency
 * @param {array} price The Number
 * @param {string} currency The currency string like : 'PLN, USD'
 * @return {object} exchangedPrice and exchangedCurrency
 */

export default async function exchangePrice(price, currency) {
  const rate = await request(process.env.EXCHANGE)
      .then(function(data) {
        const parsedBody = JSON.parse(data)
        return parsedBody.rates[currency]
      })
      .catch((err) => err)
  return {
    exchangedPrice: rate ? (price * rate).toFixed(2) : price,
    exchangedCurrency: rate ? currency : 'EUR'
  }
}
