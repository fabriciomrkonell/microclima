'use strict';

require.config({
  baseUrl: "/",
  paths: {
    'angular': 'vendor/angular/angular.min',
    'angularAMD': 'vendor/angular/angularAMD.min',
    'ngRoute': 'vendor/angular/angular-route.min',
    'ngAnimate': 'vendor/angular/angular-animate.min',
    'bootstrap': 'vendor/bootstrap/js/bootstrap.min',
    'jquery': 'vendor/jquery/jquery.min',
    'skycons': 'vendor/skycons/skycons',
    'chart': 'vendor/chart/js/chart.min',
    'morris': 'vendor/morris/js/morris.min',
    'eve': 'vendor/eve/js/eve',
    'raphael': 'vendor/raphael/js/raphael.min'
  },
  shim: {
    'angular': ['jquery'],
    'chart': ['jquery'],
    'skycons': ['jquery'],
    'raphael': ['eve'],
    'morris': ['jquery', 'raphael'],
    'angularAMD': ['angular'],
    'ngRoute': ['angular'],
    'ngAnimate': ['angular'],
    'bootstrap': ['jquery']
  },
  deps: ['js/index', 'bootstrap', 'skycons', 'morris']
});