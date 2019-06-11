import express from 'express'

console.log('test')

const API = express()

API.get('/', (req, res) => {
  res.status(200).json({ name: 'john' })
})

export default API