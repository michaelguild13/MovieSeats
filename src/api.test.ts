import request from 'supertest'
import API from './api'
import data from './data'

describe('Test API', () => {
  it('should GET all the data at root', () => {
      return request(API)
              .get('/')
              .expect(200, data)
  })
  it('should fail on post to root', () => {
    return request(API)
            .post('/')
            .expect(404, {})
  })
})