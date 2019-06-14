import request from 'supertest'
import express from 'express'
import API from './api'
import {AVAILABLE, UNAVAILABLE} from './constants'
import {
  getMultiDimentionalVenueLayout,
  updateMultiDimentionalVenueLayout,
  getVenueSeatsList,
  getRowLetter,
  getAvailableSeats,
  getBestSeats,
  isEven
} from './utils'
import data, { iVenueWithSeats, iVenueGrid } from './data'

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

describe('Test utilities', () => {
  let Data: iVenueWithSeats

  beforeEach(() => {
    Data = data
  })

  describe('isEven', () => {
    it('should return true on even numbers', () => {
      expect(isEven(6)).toBe(true)
    })
    it('should return false on even numbers', () => {
      expect(isEven(7)).toBe(false)
    })
  })

  describe('getVenueSeatsList', () => {
    it('Should give me an array of all possible seats', () => {
      Data.venue.layout.rows= 2
      Data.venue.layout.columns = 2
      expect(getVenueSeatsList(Data)).toEqual(['a1','a2','b1','b2'])
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
    it('Should give me an array of available seats in order', () => {
      Data.venue.layout.rows = 50
      Data.venue.layout.columns = 10
      Data.seats = {
        'z7': {
            id: 'z7',
            row: 'z',
            column: 7,
            status: AVAILABLE
        },
        'aa1': {
          id: 'aa1',
          row: 'aa',
          column: 7,
          status: AVAILABLE
        },
        ...Data.seats
      }
      console.log(Data)
      expect(getAvailableSeats(Data)).toEqual(['a1','b5','h7','z7', 'aa1'])
    })
  })

  describe('getMultiDimentionalVenueLayout', () => {
    it('should return a multi dimentional array map of the venu', () => {
      Data.venue.layout.rows = 4
      Data.venue.layout.columns = 4
      const map = getMultiDimentionalVenueLayout(Data)
      const keys = Object.keys(map)
      expect(keys.length).toBe(Data.venue.layout.rows)
      for( let key of keys) {
        expect(map[key].length).toBe(Data.venue.layout.columns)
      }
    })
  })

  describe('updateMultiDimentionalVenueLayout', () => {
    it('should return a multi dimentional array map of the venu', () => {
      Data.venue.layout.rows = 4
      Data.venue.layout.columns = 4
      Data.seats = {
        'a7': {
            id: 'a7',
            row: 'a',
            column: 7,
            status: UNAVAILABLE
        },
        'a1': {
          id: 'a1',
          row: 'a',
          column: 1,
          status: AVAILABLE
        },
        'a3': {
          id: 'a3',
          row: 'a',
          column: 3,
          status: UNAVAILABLE
        }
      }
      const received = {
        a: [ 0, 0, 0, 1 ],
        b: [ 0, 0, 0, 0 ],
        c: [ 0, 0, 0, 0 ],
        d: [ 0, 0, 0, 0 ]
      }
      const grid = getMultiDimentionalVenueLayout(Data)
      expect(updateMultiDimentionalVenueLayout(Data, grid)).toEqual(received)
    })
  })

  describe('getBestSeats', () => {
    //const listOfSeats = getAvailableSeats(Data)
    it('venue with 10 rows and 12 columns with all seats open, the best seat would be either A6', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 12
      let count = 12
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: AVAILABLE
        }
      }
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid)).toEqual(['a6'])
    })

    it('venue with 10 rows and 12 columns with only A2 open', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 12
      let count = 12
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: UNAVAILABLE
        }
      }
      seats['a2'].status = AVAILABLE
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid)).toEqual(['a2'])
    })

    it('venue with 10 rows and 12 columns with all of A Unavailable should give me b6', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 12
      let count = 12
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: UNAVAILABLE
        }
      }
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid)).toEqual(['b6'])
    })

    it('venue with 10 rows and 12 columns with A6 unavailable should return A5 even though A7 is available', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 12
      let count = 12
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: AVAILABLE
        }
      }
      seats['a6'].status = UNAVAILABLE
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid)).toEqual(['a5'])
    })

    it('venue with 10 rows and 12 columns with A6 unavailable should return A7 and A8 since A4 is not available if group size is 2', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 12
      let count = 12
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: AVAILABLE
        }
      }
      seats['a6'].status = UNAVAILABLE
      seats['a4'].status = UNAVAILABLE
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid, 2)).toEqual(['a7','a8'])
    })

    it('venue with 10 rows and 5 columns with All of A unavailable, a request for 2 seats should give b2 and b3', () => {
      Data.venue.layout.rows = 10
      Data.venue.layout.columns = 5
      let count = 5
      let seats = {}
      while(count--) {
        seats[`a${count}`] = {
          id: `a${count}`,
          row: "a",
          column: count,
          status: UNAVAILABLE
        }
      }
      Data.seats = seats
      let grid = getMultiDimentionalVenueLayout(Data)
      grid = updateMultiDimentionalVenueLayout(Data, grid)
      expect(getBestSeats(Data, grid, 2)).toEqual(['b2','b3'])
    })
  })
})
