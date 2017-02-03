module.exports = function(grunt){

  require('load-grunt-config')(grunt, {});
  
  grunt.registerTask('build', ['webpack:dev']);
  grunt.registerTask('serve', ['build', 'connect:server:keepalive', 'watch:js']);

};