import express, { Router } from 'express'
import helmet from 'helmet'

import {
  getMultiDimentionalVenueLayout,
  getVenueSeatsList,
  getRowLetter,
  getAvailableSeats,
  getBestSeats,
  isEven
} from './utils'

import data, { iVenueWithSeats, iSeat } from './data'

let DATA: iVenueWithSeats = data
let MultiDimentionalVenueLayout = getMultiDimentionalVenueLayout(DATA)

const API = Router()

// https://helmetjs.github.io/
API.use(helmet())
API.use(express.json())

// get all the data
API.get('/', (req, res) => {
  res.json(DATA)
})

// updates the venue size
API.put('/venue', (req, res) => {
  const { body: { rows, columns } } = req
  if (!!rows && rows > 0) {
    DATA.venue.layout.rows = rows
  }
  if (!!columns && columns > 0) {
    DATA.venue.layout.columns = columns
  }
  res.json(DATA)
})

// get best seats query url
API.get('/best:numberOfSeats', (req, res) => {
  const { params: numberOfSeats } = req
  if (!!numberOfSeats && numberOfSeats > 0) {

  }

  res.json(DATA)
})

// Handle 404
API.use(function(req, res) {
  res.status(404)
  res.json({})
});

export default API