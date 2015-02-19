module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    mocha_casperjs: {
      options: {
        timeout: 5000,
        color: false
      },
      files: {
        src: ['test/**/*']
      }
    },
    jshint: {
      src: ['*.js', 'test/*']
    },watch: {
      scripts: {
        files: ['*.js', 'test/*'],
        tasks: ['express:test', 'mocha_casperjs', 'jshint']
      }
    },
    express: {
      test: {
        options: {
          script: 'server.js',
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-casperjs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');

  grunt.registerTask('default', ['express:test', 'mocha_casperjs', 'jshint']);

};
