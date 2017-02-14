module.exports = function(grunt, options){
  return {
    options:{
      interval: 2000
    },
    js: {
      tasks: ['webpack:dev'],
      files: [
        'src/client/app/*.jsx',
        'src/client/app/**/*.jsx'
      ],
      options: {
        livereload: true
      }
    }
  };
}
