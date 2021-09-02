const express = require('express')

const server = express()

const PORT = process.env.PORT || 5000

server.use(express.json())

server.use('*', (req, res) => {
  res.send(`<h1>web-45-web-sprint-challenge-build-a-web-api-kennymiesner is up and running</h1>`)
})

server.listen(PORT, () => {
  console.log(`\n *** Server Running on Port ${PORT} *** \n`)
})