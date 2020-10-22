const authController = require('./auth')
const userController = require('./users')
const brandController = require('./brands')
const productController = require('./products')
const contactController = require('./contact')
const rateController = require('./rates')
const newController = require('./news')

module.exports = {
  authController,
  userController,
  brandController,
  productController,
  contactController,
  rateController,
  newController
}