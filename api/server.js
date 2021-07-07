const express = require('express');
const router = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json())
// global middlewares and the user's router need to be connected here
const {
  logger,
  validateUserId,
  validateUser,
  validatePost, 
  errorHandling
} = require('./middleware/middleware')

server.use('/api/users', logger, router)

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

server.use(errorHandling)

module.exports = server;
