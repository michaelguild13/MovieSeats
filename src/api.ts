import express, { Router } from 'express'
import helmet from 'helmet'

import {
  updateMultiDimentionalVenueLayout,
  getMultiDimentionalVenueLayout,
  getBestSeats,
} from './utils'

import data, { iVenueWithSeats, iSeat } from './data'

let DATA: iVenueWithSeats = data
let GRID = updateMultiDimentionalVenueLayout(DATA, getMultiDimentionalVenueLayout(DATA))

const API = Router()

// https://helmetjs.github.io/
// API.use(helmet())
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
API.get('/bestseats', (req, res) => {
  console.log('sdkfjalsfj')
  res.json(getBestSeats(DATA, GRID))
})

API.get('/bestseats/:groupsize', (req, res) => {
  const { params: { groupsize } } = req
  console.log(groupsize)
  const seats = getBestSeats(DATA, GRID, groupsize)
  res.json(seats)
})

// Handle 404
API.use(function(req, res) {
  res.status(404)
  res.json({})
});

export default API