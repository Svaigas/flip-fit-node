const { routerV1 } = require('../src/routes/routes')
const express = require('express')
const moxios = require('moxios')
const request = require('supertest')
import 'babel-polyfill'

const initV1 = () => {
  const app = express()
  app.use(routerV1())
  return app
}

describe('GET /', () => {
  // TODO Add testing for each APIs
 /* beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('It should fetch HugoDF from GitHub', async () => {
    moxios.stubRequest('/', {
      status: 200,
      response: {}
    })
    const app = initV1()
    await request(app).get('/')
    expect(moxios.requests.mostRecent().url).toBe('/')
  })*/
})