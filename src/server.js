import express from 'express'

console.log('test');

const app = express()

app.get('/', (req, res) => {
    res.send("Hello world from Express!!")
})

app.listen(3000, () => {
    console.log('Example app listening on port 3000')
})