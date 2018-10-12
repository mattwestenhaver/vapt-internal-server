const
  express = require('express'),
  projectsRouter = new express.Router(),
  projectsController = require('../controllers/projects.js')
;

projectsRouter.route('/')
  .get(projectsController.index)
  .post(projectsController.create)
;

projectsRouter.route('/:id')
  .put(projectsController.update)
;

module.exports = projectsRouter