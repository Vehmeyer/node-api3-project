const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timeStamp = Date.now()
  console.log(`${req.method}, ${req.url}`, timeStamp)
  next()
}

async function validateUserId (req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    // console.log(`the id is ${id}`)
    const userId = await Users.getById(id)
    if (userId) {
      req.user = userId
      next()
    } else {
      res.status(404).json({message: "user not found"})
      // next({
      //   status: 404,
      //   message: "user not found"
      // })
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