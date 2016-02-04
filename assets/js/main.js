if (process.env.NODE_ENV === 'development') {
  module.exports = require('./app.js')
} else {
  module.exports = require('./app.min.js')
}
