var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://103.16.170.117:8090"',
  GOOGLE_CLIENT_ID: '"683005103605-tjutvaruhetc4mplnttpkh4qk23rtq1u.apps.googleusercontent.com"',
  FACEBOOK_APP_ID: '"152018012048990"'
})
