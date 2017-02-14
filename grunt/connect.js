module.exports = function(grunt, options) {
  return {
    server: {
      options:{
        port:9696,
        hostname: 'local.one.react.com',
        open: true,
        livereload: 35729,
        base: [
          'src/client'
        ],
        middleware: function (connect, options) {
          console.log("Connect: ", connect);
          console.log("Options: ", options);
          var push = Array.prototype.push;
          var middlewares = [];
          var routes = require('../src/back/middleware/middleware');
          var directory = options.directory || options.base[options.base.length -1];
          console.log("routes: ", routes);
          console.log("directory: ", directory);
          // Run static middleware **before** static files to serve
          // files dynamically
          push.apply(middlewares, routes.static);
          options.base.forEach(function(base){
            // Serve static files
            middlewares.push(connect.static(base));
          });

          // Make directory browse-able.
          middlewares.push(connect.directory(directory));

          return middlewares;
        }
      }
    },
    livereload: {
      options: {
        open: true,
        base: [
          'src/client'
        ]
      }
    }
  };
}
