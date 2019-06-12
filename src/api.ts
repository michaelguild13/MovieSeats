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

// Creates an array of list of seating options
export const getVenueSeatsList = (data:iVenueWithSeats) => {
  let {venue: {layout: {rows, columns}}} = data
  // build a map...assuming the list of seat keys isn't safe
  // to assume are available
  let rowCount: number = 0
  let colCount: number = 0
  let venueSeatsList: string[] = []
  while(rowCount !== rows) {
    rowCount++
    let row:string = getRowLetter(rowCount)
    while (colCount !== columns) {
      colCount++
      venueSeatsList.push(`${row}${colCount}`)
    }
    // start loop though all the columns agian
    colCount = 0
  }
  return venueSeatsList
}

// Simple solution for if the rows never go past 26
// export const getAvailableSeats = (data:iVenueWithSeats) => {
//   const { seats = {} } = data
//   const seatKeys = Object.keys(seats).sort() // alpha order
//   let availableSeats: string[] = []
//   for (let seat of seatKeys) {
//     if (seats[seat].status === 'AVAILABLE') {
//       availableSeats.push(seat)
//     }
//   }
//   return availableSeats
// }

export const getAvailableSeats = (data:iVenueWithSeats) => {
  let { seats = {} } = data
  const listOfSeats = getVenueSeatsList(data).filter( (i) => {
    if (!seats[i]) return // no seat = no availability
    const status = seats[i].status || ''
    return status === 'AVAILABLE'
  })
  return listOfSeats
}

export const isEven = (n: number) => {
  return (n % 2 === 0)
}

const getCenterOfRow = (n: number) => {
  // if even number assume left seat is best, ex: 6 = 3
  // if odd, higher number is better, ex: 5 = 3
  if(isEven(n)) {
    return  n / 2
  } else {
    return Math.ceil(n / 2)
  }
}

const getDifference = (a, b) => {
  return Math.abs(a - b)
}

export const getBestSeats = (data:iVenueWithSeats) => {
  const  { venue: {layout: {rows, columns}}, seats = {}} = data
  let centerRow = getCenterOfRow(columns)
  console.log(centerRow)
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