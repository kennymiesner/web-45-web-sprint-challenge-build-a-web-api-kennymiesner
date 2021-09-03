const express = require('express')
const Action = require('./actions-model')
const {
  validateActionId,
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

// router.post('/', validateAction, (req, res, next) => {
//   .then(newAction => {
//     res.status(201).json(newAction)
//   })
//   .catch(next)
// })

router.delete('/:id', validateActionId, (req, res, next) => {
  Action.remove(req.params.id)
    .then(action => {
      res.status(204).json(action)
    })
    .catch(next)
})

module.exports = router