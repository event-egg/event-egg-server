const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  defaultCity: String,
  defaultInterests: Array,
  savedEvents: Array,
  email: String
  // profilePic: user photo from AuthO?
})

const User = mongoose.model('User', userSchema);

module.exports = User;