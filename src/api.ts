import express from 'express'
import helmet from 'helmet'
import data, { iVenueWithSeats, iVenue, iSeat } from './data'

let DATA = data

const API = express()

// https://helmetjs.github.io/
API.use(helmet())
API.use(express.json())

API.get('/', (req, res) => {
  res.json(DATA)
})


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

// Handle 404
API.use(function(req, res) {
  res.status(404)
  res.json({})
});

export default API