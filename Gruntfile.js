module.exports = function(grunt){

  require('load-grunt-config')(grunt, {});

  grunt.registerTask('build', ['webpack:dev']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch:js']);

  grunt.loadNpmTasks('grunt-webdriver')

  grunt.registerTask('e2e', ['build', 'connect:server','webdriver']);
};
