const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: Date.now
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    default: 'male'
  },
  address: {
    type: String,
  },
  role: {
    type: String,
    enum: ['super-admin', 'admin', 'user'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('users', userSchema)