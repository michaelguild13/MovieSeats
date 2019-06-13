import data, { iVenueWithSeats, iSeats, iSeat, iVenueGrid } from './data'
import {AVAILABLE, UNAVAILABLE} from './constants'

const isAvailable = (seat: iSeat) => {
  if (!seat) return false // no seat = no availability
  const status = seat.status || ''
  return status === AVAILABLE
}

const getDifference = (a, b) => {
return Math.abs(a - b)
}

export const isEven = (n: number) => {
  return (n % 2 === 0)
}

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
//     if (seats[seat].status === AVAILABLE) {
//       availableSeats.push(seat)
//     }
//   }
//   return availableSeats
// }

// builds a grid system in alpha order
export const getMultiDimentionalVenueLayout = (data:iVenueWithSeats) => {
  let {venue: {layout: {rows, columns}}} = data
  // build a map...assuming the list of seat keys isn't safe
  // to assume are available
  let rowCount: number = 0
  let venueSeatsList: {} = {}
  while(rowCount !== rows) {
    rowCount++
    let row:string = getRowLetter(rowCount)
    venueSeatsList[row] = Array(columns).fill(0)
  }
  return venueSeatsList
}

export const updateMultiDimentionalVenueLayout = (data:iVenueWithSeats, grid: iVenueGrid) => {
  const { seats = {} } = data
  let newGrid = {...grid}
  const seatKeys = Object.keys(seats)
  seatKeys.forEach( seat => {
    const row = seats[seat].row
    const column = seats[seat].column
    if (newGrid[row][column] === undefined) return
    if ( isAvailable(seats[seat])) {
      // check if it's there
      newGrid[row][column] = 0
    } else {
      newGrid[row][column] = 1
    }
  })
  return newGrid
}

export const getAvailableSeats = (data:iVenueWithSeats) => {
  let { seats = {} } = data
  const listOfSeats = getVenueSeatsList(data).filter( (i) => {
    return isAvailable(seats[i])
  })
  return listOfSeats
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


interface iGetSubsequentMatches {
  startIndex: number,
  row: number[],
  direction: string,
  groupSize: number
}

export const getSubsequentMatches = ({startIndex, row, direction, groupSize = 1}): iGetSubsequentMatches => {
  return row.reduce((list, val, index) => {

  }, [])
}

interface iGetRowSeatsAvailable {
  startIndex: number,
  columns: number,
  grid: iVenueGrid,
  row: string,
  groupSize: number
}


export const getRowSeatsAvailable = ({startIndex, columns, grid, row, groupSize = 1}: iGetRowSeatsAvailable) => {
  let leftIndex = startIndex
  let rightIndex = startIndex
  let bestSeats: string[] = []
  console.log(groupSize)
  while (leftIndex > 0 && rightIndex < columns) {
    leftIndex--
    rightIndex++
    // then check to the left
    if (grid[row][leftIndex] === 0) {
      bestSeats.push(`${row}${leftIndex}`)

      getSubsequentMatches({startIndex: leftIndex, row, direction: 0, groupSize})

      if (bestSeats.length === groupSize) break;
    }
    // then check to the right
    if (grid[row][rightIndex] === 0) {
      bestSeats.push(`${row}${rightIndex}`)
      if (bestSeats.length === groupSize) break;
    }

    if (bestSeats.length === groupSize) break;
  }

  return bestSeats
}

export const getBestSeats = (data:iVenueWithSeats, grid: iVenueGrid, groupSize: number = 1) => {
  const  { venue: {layout: {columns}}, seats = {}} = data
  const rows = Object.keys(grid)
  const startIndex: number = getCenterOfRow(columns)
  let bestSeats: string[] = []

  // we are assuming the grid system in in alpha order
  // coming from getMultiDimentionalVenueLayout
  rows.some( row => {
    // check center
    if (grid[row][startIndex] === 0) {
      bestSeats.push(`${row}${startIndex}`)
    }
    const rowSeats = getRowSeatsAvailable({startIndex, columns, grid, row, groupSize})
    if (rowSeats.length > 0) {
      bestSeats = rowSeats
    }
    // exit once we have the right number of seats
    return bestSeats.length === groupSize
  })
  return bestSeats
}