import express from 'express'
import routesV1 from './routes/routes'
import {} from 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/v1', routesV1)

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})
