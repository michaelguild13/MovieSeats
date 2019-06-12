import express from 'express'
import API from './api'

const app = express()

app.use('/api/v1', API)

app.listen(3000, () => {
  console.log('Example app listening on port 3000')
})