module.exports = function(grunt){

  require('load-grunt-config')(grunt, {});

  grunt.registerTask('build', ['webpack:dev']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch:js']);

  grunt.loadNpmTasks('grunt-webdriver')

  grunt.initConfig({
      webdriver: {
          test: {
              configFile: './test/wdio.conf.js',
          }
      }
  });
};
