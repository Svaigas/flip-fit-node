import mongoose from 'mongoose'
import { mongoServer } from '../index'
const Schema = mongoose.Schema

export async function createSchemas(uri) {
  const productSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: false }
  })
  const Product = mongoose.model('Product', productSchema)
  await Product.create({
    name: 'MacBook Pro',
    quantity: 2,
    description: 'example description'
  }, function(err) {
    // TODO error handling
    // if (err) return handleError(err)
    // saved!
  });
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
}
