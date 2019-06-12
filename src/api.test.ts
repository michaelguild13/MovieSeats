import request from 'supertest'
import express from 'express'
import API, { getBestSeats, getLetter } from './api'
import data, { iVenueWithSeats } from './data'

const SERVER = express()
SERVER.use(API)

const badValues = ['', null, [], {}]

describe('Test API', () => {
  let Data: iVenueWithSeats

  beforeEach(() => {
    Data = data
  })

  describe('/', () => {
    it('should GET all the data at root', () => {
      return request(SERVER)
              .get('/')
              .expect(200, Data)
    })

    it('should fail on post to root', () => {
      return request(SERVER)
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
      return request(SERVER)
              .put('/venue')
              .send(Data.venue.layout)
              .expect(200, Data)
    })

    it('should not allow the venue size be less than 1 seat', () => {
      return request(SERVER)
              .put('/venue')
              .send({
                rows: 0,
                columns: 0
              })
              .expect(200, Data)
    })

    it.each(badValues)(`should not allow bad values`, (i) => {
      return request(SERVER)
              .put('/venue')
              .send({
                rows: i,
                columns: i
              })
              .expect(200, Data)
    })
  })
})

describe('getBestSeats', () => {
  it('Should give me the best seats', () => {

  })
})

describe('getLetter', () => {
  it('Should a letter', () => {
    expect(getLetter(1)).toBe('a')
    expect(getLetter(2)).toBe('b')
    expect(getLetter(29)).toBe('cc')
    expect(getLetter(55)).toBe('ccc')
  })
})