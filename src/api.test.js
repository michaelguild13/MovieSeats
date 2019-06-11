import request from 'supertest'
import API from './api'

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
      const response = await request(API).get('/')
      expect(response.status).toBe(200)
  });
})