const
  express = require('express'),
  projectsRouter = new express.Router(),
  projectsController = require('../controllers/projects.js')
;

projectsRouter.route('/')
  .get(projectsController.index)
  .post(projectsController.create)
;

module.exports = projectsRouter