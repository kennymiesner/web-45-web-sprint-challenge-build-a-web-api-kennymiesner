const express = require('express')
const Project = require('./projects-model')
const {
  validateProjectId,
  validateProject,
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

router.post('/', validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'projects router error',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router