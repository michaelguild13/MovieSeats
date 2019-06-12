import request from 'supertest'
import API from './api'
import data, { iVenueWithSeats } from './data'

const badValues = ['', null, [], {}]

describe('Test API', () => {
  let Data: iVenueWithSeats

  beforeEach(() => {
    Data = data
  })

  describe('/', () => {
    it('should GET all the data at root', () => {
      return request(API)
              .get('/')
              .expect(200, Data)
    })

    it('should fail on post to root', () => {
      return request(API)
              .post('/')
              .expect(404, {})
    })
  })

  describe('/venue', () => {
    it('should update the venue size', () => {
      Data.venue.layout = {
        rows: 2,
        columns: 2
      }
      return request(API)
              .put('/venue')
              .send(Data.venue.layout)
              .expect(200, Data)
    })

    it('should not allow the venue size be less than 1 seat', () => {
      return request(API)
              .put('/venue')
              .send({
                rows: 0,
                columns: 0
              })
              .expect(200, Data)
    })

    it.each(badValues)(`should not allow bad values`, (i) => {
      return request(API)
              .put('/venue')
              .send({
                rows: i,
                columns: i
              })
              .expect(200, Data)
    })
  })
})