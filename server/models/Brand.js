const mongoose = require('mongoose')

const brandSchema = mongoose.Schema({
  name: String,
  image: String,
  description: {
    type: String,
    required: false
  },
  slug: {
    type: String,
    required: true,
    unique: true
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

module.exports = mongoose.model("brands", brandSchema)