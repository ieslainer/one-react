var path = require('path');

var BUILD_DIR = path.resolve(__dirname, '../src/client/public');
var APP_DIR = path.resolve(__dirname, '../src/client/app');

module.exports = function(grunt, options){
  return {
    dev:{
      context: APP_DIR,
      entry: ['./index.jsx', './summary.jsx'],
      output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
      },
      module : {
        loaders : [
          {
            test : /\.jsx?/,
            include : APP_DIR,
            loader : 'babel'
          }
        ]
      }
    }
  };
}