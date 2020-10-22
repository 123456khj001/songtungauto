const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: String,
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands"
  },
  description: String,
  images: Array,
  isOld: {
    type: Boolean,
    default: false
  },
  year: Number,
  origin: String,
  price: Number,  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model("products", productSchema)