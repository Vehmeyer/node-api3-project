const Users = require('../users/users-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  console.log(`${req.method}, ${req.url}, Date.now()`)
  next()
}

async function validateUserId (req, res, next) {
  // DO YOUR MAGIC
  try {
    const { id } = req.params
    console.log(`the id is ${id}`)
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
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
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