const
  Project = require('../models/Project.js')
;

module.exports = {

  index: (req, res) => {
    Project.find({}, (err, projects) => {
      if(err) return res.json({ success: false, code: err.code })
      res.json({ success: true, projects })
    })
  },

  show: (req, res) => {
    Project.findById(req.params.id, (err, project) => {
      if(err) return res.json({ success: false, code: err.code })
      res.json({ success: true, project })
    })
  },

  create: (req, res) => {
    Project.create(req.body, (err, project) => {
      if(err) return res.json({ success:false, code: err.code })
      res.json({ success: true, message: "Project successfully created.", project })
    })
  },

  update: (req, res) => {
    Project.findById(req.params.id, (err, project) => {
      if (err) return res.json({ success: false, message: "Project update failed", error: err})
      Object.assign(project, req.body)
      project.save((err, updatedProject) => {
        if(err) res.json({success: false, code: err.code})
        res.json({success: true, message: "Project updated.", updatedProject})
      })
    })
  }

}