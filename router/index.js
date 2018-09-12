module.exports = (app) => {
  app.use('/tools', require('./tools')),
  app.use('/user', require('./user'))
}