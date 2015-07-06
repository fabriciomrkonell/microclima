'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    /*uncss: {
      dist: {
        files: {
          'public/dist/css/login.css': ['views/login.html']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/dist/css/login.min.css': ['public/dist/css/login.css']
        }
      }
    },*/
    uglify: {
      my_target: {
        files: {
          'public/dist/js/login.min.js': ['public/vendor/angular/angular.js',
          'public/vendor/angularstorage/ngStorage.min.js', 'public/js/login.js']
        }
      }
    }
  });

  grunt.registerTask('default', ['uglify']);

};