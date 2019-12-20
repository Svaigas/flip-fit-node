import express from 'express'
import routesV1 from './routes/routes'
import {} from 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

import { MongoMemoryServer } from 'mongodb-memory-server'
export const mongoServer = new MongoMemoryServer()
import { createSchemas } from './db/index'
// import mongoose from 'mongoose'
// export const conn = mongoose.createConnection()

app.use('/v1', routesV1)

app.listen(PORT, async () => {
  console.log(`Server is listening on port: ${PORT}`)
  const uri = await mongoServer.getConnectionString()
  await createSchemas(uri)
  console.log(`MongoDB server is runing at uri: ${uri}`)
})
