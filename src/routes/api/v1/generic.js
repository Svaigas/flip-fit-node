import { mongoServer } from '../../../index'
// import mongoose from 'mongoose'

/**
 * Add two numbers.
 * @param {number} req The API request
 * @param {number} res The API response
 */
export async function findById(req, res) {
  const { params: { id, type } } = req
  console.log(mongoServer.getInstanceInfo())

  res.send(`id ${id} type ${type}`)
}
