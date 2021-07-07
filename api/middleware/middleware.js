const User = require('../users/users-model')

function logger(req, res, next) {
  // const timeStamp = Date.now()
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.originalUrl 
  console.log(`[${timestamp}] ${method} ${url}`)
  // console.log(`${req.method}, ${req.url}`, timestamp)
  next()
}

async function validateUserId (req, res, next) {
  try {
    const user = await User.getById(req.params.id)
    if (!user) {
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user
      next()
     }
  } catch (err) {
    next(err)
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.name) {
    res.status(400).json({message: "missing required name field"})
    // next({
    //   status: 400,
    //   message: "missing required name field"
    // }) 
  } else {
      next()
    }
  }

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  if (!req.body.text) {
    next({
      status: 400,
      message: "missing required text field"
    })
  } else {
    next()
  }
}

const errorHandling = (err, res, next) => { // eslint-disable-line
  const status = err.status || 500
  res.status(status).json({
    message: err.message
  })
}

// do not forget to expose these functions to other modules
module.exports = {
  logger, 
  validateUserId,
  validateUser,
  validatePost, 
  errorHandling
}