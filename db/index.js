import mongoose from 'mongoose'
const Schema = mongoose.Schema

export async function createSchemas(uri) {
  const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    currency: { type: String, required: false, default: 'EUR' }
  })
  mongoose.model('Product', productSchema)

  const cartSchema = new Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    cartPrice: { type: Number }
  })
  mongoose.model('Cart', cartSchema)
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}
