'use strict';

module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    uncss: {
      dist: {
        files: {
          'public/dist/css/index.css': ['views/css.html', 'views/index.html', 'public/tpl/home.html', 'public/tpl/maps.html']
        }
      }
    },
    cssmin: {
      target: {
        files: {
          'public/dist/css/index.min.css': ['public/dist/css/index.css']
        }
      }
    },
    uglify: {
      my_target: {
        files: {
          'public/dist/js/login.min.js': ['public/vendor/angular/angular.js',
          'public/vendor/angularstorage/ngStorage.min.js', 'public/js/login.js']
        }
      }
    }
  });

  grunt.registerTask('default', ['uncss', 'cssmin', 'uglify']);

};