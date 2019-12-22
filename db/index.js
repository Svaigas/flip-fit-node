import mongoose from 'mongoose'
const Schema = mongoose.Schema

export async function createSchemas(uri) {
  const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    currency: { type: String, required: true }
  })
  const Product = mongoose.model('Product', productSchema)

  const cartSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
  })
  const Cart = mongoose.model('Cart', cartSchema)

  await Product.create({
    name: 'MacBook Pro',
    quantity: 2,
    description: 'example description',
    price: 2.15,
    currency: 'EUR'
  }, function(err,data) {
    console.log(data.id)
    if (err) throw err
  })
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}
