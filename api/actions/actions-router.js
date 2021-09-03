const express = require('express')
const Action = require('./actions-model')
const {
  validateActionId,
  validateAction,
} = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(next)
})

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
  Action.insert(req.body)
    .then(newAction => {
      res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
  Action.update(req.params.id, req.body)
    .then(() => {
      return Action.get(req.params.id)
    })
    .then(action => {
      res.status(200).json(action)
    })
    .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(action => {
      res.status(204).json(action)
    })
    .catch(next)
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'actions router error',
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router