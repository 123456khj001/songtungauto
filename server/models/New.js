const mongoose = require('mongoose')

const newSchema = mongoose.Schema({
  title: String,
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  content: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("news", newSchema)