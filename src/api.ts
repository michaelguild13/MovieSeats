import express, { Router } from 'express'
import helmet from 'helmet'
import data, { iVenueWithSeats, iSeat } from './data'

let DATA: iVenueWithSeats = data

export const getRowLetter = (n: number) => {
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

export const getVenueArrayMap = (data:iVenueWithSeats) => {
  let {venue: {layout: {rows, columns}}} = data
  // build a map...assuming the list of seat keys isn't safe
  // to assume are available
  //console.log(Object.keys(seats))
  let rowCount: number = 0
  let colCount: number = 0
  let venueArrayMap: string[] = []
  while(rowCount !== rows) {
    rowCount++
    let row:string = getRowLetter(rowCount)
    while (colCount !== columns) {
      colCount++
      venueArrayMap.push(`${row}${colCount}`)
    }
    // start loop though all the columns agian
    colCount = 0
  }
  return venueArrayMap
}

export const getAvailableSeats = (data:iVenueWithSeats, venueArrayMap: string[]) => {
  let { seats = {} } = data
  return venueArrayMap.filter( (i) => {
    if (!seats[i]) return
    const status = seats[i].status || ''
    return status === 'AVAILABLE'
  })
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