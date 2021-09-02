const express = require('express')
const Project = require('./projects-model')
const {
  validateProjectId
} = require('./projects-middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(next)
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'projects router error',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router