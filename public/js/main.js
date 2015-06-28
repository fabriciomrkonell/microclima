'use strict';

require.config({
  baseUrl: "/",
  paths: {
    'angular': 'vendor/angular/angular.min',
    'angularAMD': 'vendor/angular/angularAMD.min',
    'ngRoute': 'vendor/angular/angular-route.min',
    'bootstrap': 'vendor/bootstrap/js/bootstrap.min',
    'jquery': 'vendor/jquery/jquery.min'
  },
  shim: {
    'angular': ['jquery'],
    'angularAMD': ['angular'],
    'ngRoute': ['angular'],
    'bootstrap': ['jquery']
  },
  deps: ['js/index', 'bootstrap']
});