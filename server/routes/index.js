const authRoute = require('./auth')
const userRoute = require('./users')
const brandRoute = require('./brands')
const productRoute = require('./products')
const contactRoute = require('./contact')
const rateRoute = require('./rates')
const newRoute = require('./news')

module.exports = app => {
  app.use('/api/auth', authRoute)
  app.use('/api/users', userRoute)
  app.use('/api/brands', brandRoute)
  app.use('/api/products', productRoute)
  app.use('/api/contacts', contactRoute)
  app.use('/api/rates', rateRoute)
  app.use('/api/news', newRoute)

  return app
}