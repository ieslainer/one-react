module.exports = function(grunt){

  require('load-grunt-config')(grunt, {});

  grunt.registerTask('build', ['webpack:dev']);
  grunt.registerTask('serve', ['build', 'connect:server', 'watch:js']);
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-selenium-webdriver');
  grunt.registerTask('e2e', [
    'selenium_phantom_hub',
    'mocha_e2e',
    'selenium_stop'
  ]);

  grunt.initConfig({
    webdriver: {
      test: {
          configFile: './test/wdio.conf.js'
      },
      selenium_start: {
        options: { port: 4444 }
    },
    },
    // ...
  });
};
