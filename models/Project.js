const
  mongoose = require('mongoose'),

  noteSchema = new mongoose.Schema({
    body: String,
    author: String
  })

  youtubeEditSchema = new mongoose.Schema({
    link: String,
    notes: [noteSchema]
  })

  projectSchema = new mongoose.Schema({
    projectName: { type: String, unique: true, required: true },
    client: { type: String, required: true},
    clientLead: { type: String, required: true},
    type: { type: String, required: true },
    industry: { type: String, required: true },
    filmingDate: { type: String, required: true },
    producers: [{ type: String }],
    vr2: { type: String, default: null },
    fusion: { type: String, default: null },
    equipmentIssues: { type: String, default: null },
    editors: [{ type: String, default: null }],
    editStart: { type: String, default: null },
    editEnd: { type: String, default: null },
    youtubeEdits: [youtubeEditSchema],
    driveFinal: { type: String, default: null },
    urlFinal: { type: String, default: null }
  })
;

const Project = mongoose.model('Project', projectSchema)
module.exports = Project