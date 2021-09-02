function logger(req, res, next) {
  console.log(`Request Method: ${req.method}`)
  console.log(`Request URL: ${req.url}`)
  console.log(`Timestamp: ${Date.now()}`)
  next()
}

module.exports = {
  logger
}