
var path = require('path'),
      rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development : {
    db : 'mongodb://127.0.0.1:27017/intervalfilter',
    root : rootPath
  },
  production : {
    db : 'mongodb://heroku_app30721403:heroku_app30721403@ds033170.mongolab.com:33170/heroku_app30721403',
    root : rootPath
  }
};