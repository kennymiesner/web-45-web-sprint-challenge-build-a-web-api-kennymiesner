const express = require('express')
const { logger } = require('./middleware/middleware')
const projectsRouter = require('./projects/projects-router')

const server = express()

server.use(express.json())

server.use(logger)

server.use('/api/projects', projectsRouter)

server.use('*', (req, res) => {
  res.send(`<h1>web-45-web-sprint-challenge-build-a-web-api-kennymiesner is up and running</h1>`)
})

module.exports = server
