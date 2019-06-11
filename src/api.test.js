import request from 'supertest'
import API from './api'
import data from './data'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
      const { status, body} = await request(API).get('/')
      expect(status).toBe(200)
      expect(‎JSON.stringify(body)).toMatch(JSON.stringify(data))
  });
})