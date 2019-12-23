import express from 'express'
import routesV1 from './routes/routes'
import {} from 'dotenv/config'
import { errors } from 'celebrate'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3000
const NODE_ENV = process.env.NODE_ENV

import { MongoMemoryServer } from 'mongodb-memory-server'
export const mongoServer = new MongoMemoryServer()
import { createSchemas } from '../db/index'

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use('/v1', routesV1)
app.use(errors())

app.listen(PORT, async () => {
  console.log(`Server is listening on port: ${PORT}`)
  const uri = await mongoServer.getConnectionString()
  await createSchemas(uri)
  console.log(`MongoDB server is runing at uri: ${uri}`)
})
