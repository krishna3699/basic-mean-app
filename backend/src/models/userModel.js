const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  title: {
    type: String,
    lowercase: true,
  },
  body: {
    type: String,
    lowercase: true,
    maxlength: 100,
  },
});

const User = mongoose.model('NewUser', userSchema);

module.exports = User;