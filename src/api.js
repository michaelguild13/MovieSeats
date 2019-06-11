import express from 'express'
import data from './data'

let DATA = data

const API = express()

API.get('/', (req, res) => {
  res.json(DATA)
})

export default API