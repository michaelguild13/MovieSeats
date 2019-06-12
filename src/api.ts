import express, { Router } from 'express'
import helmet from 'helmet'
import data, { iVenueWithSeats, iSeat } from './data'

let DATA: iVenueWithSeats = data

export const getLetter = (n: number) => {
  if (!!n && n <= 0) return ''
  const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
  const maxLetters = 26
  let times = 1
  let index = n - 1
  let letter: string[] = []
  if (n > maxLetters) {
    times = Math.floor(n / maxLetters) + 1
    index = (n % maxLetters) - 1 // array starts at 0
  }
  while (times--) {
    letter.push(alpha[index])
  }
  return letter.join('')
}

export const getBestSeats = (n: number, data:iVenueWithSeats) => {

}

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