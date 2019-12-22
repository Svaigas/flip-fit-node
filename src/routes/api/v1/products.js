import request from 'request-promise'
import mongoose from 'mongoose'

export async function getUpdate(req,res) {
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

export default async function exchangePrice(price, currency) {
  const rate = await request('https://api.exchangeratesapi.io/latest')
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
