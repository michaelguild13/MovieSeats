import request from 'supertest'
import express from 'express'
import API, { getVenueArrayMap, getRowLetter, getAvailableSeats } from './api'
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

describe('getVenueArrayMap', () => {
  it('Should give me an array of all possible seats', () => {
    const Data = {
      venue: {
        layout: {rows: 2, columns: 2}
      }
    }
    expect(getVenueArrayMap(Data)).toEqual(['a1','a2','b1','b2'])
  })
})

describe('getLetter', () => {
  it('Should return a letter', () => {
    expect(getRowLetter(0)).toBe('')
    expect(getRowLetter(1)).toBe('a')
    expect(getRowLetter(2)).toBe('b')
    expect(getRowLetter(29)).toBe('cc')
    expect(getRowLetter(55)).toBe('ccc')
  })
})

describe('getLetter', () => {
  it('Should return a letter', () => {
    expect(getRowLetter(0)).toBe('')
    expect(getRowLetter(1)).toBe('a')
    expect(getRowLetter(2)).toBe('b')
    expect(getRowLetter(29)).toBe('cc')
    expect(getRowLetter(55)).toBe('ccc')
  })
})

describe('getAvailableSeats', () => {
  it('Should give me an array of available seats', () => {
    const venueMap = getVenueArrayMap(data)
    expect(getAvailableSeats(data, venueMap)).toEqual(['a1','b5','h7'])
  })
})
