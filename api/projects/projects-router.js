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
  res.status(200).json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
  Project.insert(req.body)
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

// router.put('/:id', validateProjectId, (req, res, next) => {
//   Project.update(req.params.id, req.body)
//     .then(() => {
//       return Project.get(req.params.id)
//     })
//     .then(project => {
//       res.status(200).json(project)
//     })
//     .catch(next)
// })

router.delete('/:id', validateProjectId, (req, res, next) => {
  Project.remove(req.params.id)
    .then(project => {
      res.status(204).json(project)
    })
    .catch(next)
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
  Project.getProjectActions(req.params.id)
    .then(actions => {
      res.status(200).json(actions)
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