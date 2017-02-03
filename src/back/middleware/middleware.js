var fs = require('fs');
var path = require('path');

var middlewareHomePage = function(req, res, next) {
 var stream;

 if(req.url !== '/' ){
   return next();
 }

 stream = fs.createReadStream(path.join(__dirname, '../src/views/index.html'));
 return stream.pipe(res);

}

module.exports = {
  static:[
    middlewareHomePage
  ]
}