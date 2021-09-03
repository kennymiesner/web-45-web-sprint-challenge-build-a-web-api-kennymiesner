const express = require('express')
const Action = require('./actions-model')
// const {

// } = require('./actions-middlware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Action.get()
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(next)
})

module.exports = router