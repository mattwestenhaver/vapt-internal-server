const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs')

  userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true, default: false }
  })
;

userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
}

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', function(next) {
  if(this.isModified('password')) {
    this.password = this.generateHash(this.password)
  }
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User