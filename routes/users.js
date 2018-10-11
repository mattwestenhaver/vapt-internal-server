const
  express = require('express'),
  usersRouter = new express.Router(),
  verifyToken = require('../serverAuth.js').verifyToken,
  usersController = require('../controllers/users.js')
;

usersRouter.route('/')
  .get(usersController.index)
  .post(usersController.create)
;

usersRouter.post('/authenticate', usersController.authenticate)

usersRouter.use(verifyToken)

module.exports = usersRouter