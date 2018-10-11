const
  dotenv = require('dotenv').load(),
  express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  app = express(),
  mongoose = require('mongoose'),
  AWS = require('aws-sdk'),
  s3 = new AWS.S3(),
  PORT = process.env.PORT || 3001,
  MONGODB_URI =  process.env.MONGODB_URI || 'mongodb://localhost/vapt-internal',
  usersRoutes = require('./routes/users.js'),
  projectsRoutes = require('./routes/projects.js')
;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
  console.log(err || `🤘🏾 Connected to Mongo @ ${MONGODB_URI}`)
});

AWS.config.update({ 
  accessKeyId: process.env.ACCESSKEY, 
  secretAccessKey: process.env.SECRETKEY, 
  region: 'us-east-2'
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());

app.get('/', (req,res) => {
  res.json({ message: "VirtualAPT's API root" })
})

app.use('/users', usersRoutes)
app.use('/projects', projectsRoutes)

app.get('/aws', (req, res) => {
  var params = { 
    Bucket: 'videos.virtualapt.com',
    Delimiter: '/',
    Prefix: '' 
  }
  s3.listObjects(params, function (err, data) {
    if(err) throw err;
    res.json({ folders: data.CommonPrefixes, files: data.Contents, success: true })
  })
})

app.get('/aws/n', (req, res) => {
  var params = {
    Bucket: 'videos.virtualapt.com',
    Delimiter: '/',
    Prefix: `${req.query.dir}`
  }
  s3.listObjects(params, function(err, data) {
    // console.log(data)
    if(err) throw err;
    res.json({ data: data, success: true })
  })
})

app.post('/aws/upload', (req, res) => {
  console.log(req.file)
  console.log(req.body)
})

app.listen(PORT, (err) => {
  console.log(err || `Server running on PORT ${PORT} 🍻`)
})