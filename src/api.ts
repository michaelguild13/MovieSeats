import express from 'express'
import data from './data'

let DATA = data

const API = express()

API.get('/', (req, res) => {
  res.json(DATA)
})

API.put('/venue', (req, res) => {
  res.json(DATA)
})

// Handle 404
API.use(function(req, res) {
    res.status(404)
    res.json({})
});

export default API