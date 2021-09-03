const Action = require('./actions-model')

async function validateActionId(req, res, next) {
  try {
    const action = await Action.get(req.params.id)
    if (!action) {
      res.status(404).json({
        message: 'Action with the specified id does not exist'
      })
    } else {
      req.action = action
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Problem finding action'
    })
  }
}

// function validateAction(req, res, next) {
//   const {}
// }

module.exports = {
  validateActionId,
  // validateAction,
}