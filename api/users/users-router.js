const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model');
const {
  // logger,
  validateUserId,
  validateUser,
  validatePost,
  errorHandling
} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

router.get('/', (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get(req.query)
    .then(users => {
      res.status(200).json(users)
    })
    .catch(next)
})

router.get('/:id', validateUserId, (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  res.json(req.user)
});

router.post('/', validateUser, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  // Insert new user
  // const newUser = {...req.body, name: req.body.name}
  const newUser = req.body
  Users.insert(newUser)
    .then((id) => {
      return Users.getById(id)
    })
    .then(users => {
      res.json(201).json(req.user)
    }) 
    .catch(next)

});

router.put('/:id', validateUserId, validatePost, (req, res) => {
  console.log("PUT connected")
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  // Users.update(req.params.id, req.body)
});

router.delete('/:id', validateUserId, (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  console.log("DELETE connected")
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

// do not forget to export the router
module.exports = router
