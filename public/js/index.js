'use strict';

define(['angularAMD', 'ngRoute'], function (angularAMD, ngRoute) {

	angular.module('sensul', ['ngRoute']);

	angular.module('sensul').run(['$rootScope', function($rootScope){

		angular.extend($rootScope, {
			notity: {
				error: false,
				message: ''
			}
		});

		$rootScope.logout = function(){
			window.location = '/logout';
		};

		$rootScope.hideError = function(type){
			$rootScope.notity[type] = false;
		};

	}]);

	angular.module('sensul').run(['$rootScope', function($rootScope){

		window.alert = function(type, message){
			$rootScope.notity[type] = true;
			$rootScope.notity.message = message;
		}

	}]);

	angular.module('sensul').config(function ($locationProvider, $routeProvider, $httpProvider) {

	 	$locationProvider.html5Mode(true);

	  $routeProvider.when("/",
	  	angularAMD.route({
	    	templateUrl: 'tpl/home.html'
			})
		).when("/maps",
	    angularAMD.route({
	    	templateUrl: 'tpl/maps.html',
	     	controller: 'maps',
	      controllerUrl: 'js/maps'
	    })
		).when("/user",
	    angularAMD.route({
	    	templateUrl: 'tpl/user.html',
	     	controller: 'user',
	      controllerUrl: 'js/user'
	    })
		).when("/usergroup",
	    angularAMD.route({
	    	templateUrl: 'tpl/usergroup.html',
	     	controller: 'usergroup',
	      controllerUrl: 'js/usergroup'
	    })
		).when("/sensor",
	    angularAMD.route({
	    	templateUrl: 'tpl/sensor.html',
	     	controller: 'sensor',
	      controllerUrl: 'js/sensor'
	    })
		).when("/station",
	    angularAMD.route({
	    	templateUrl: 'tpl/station.html',
	     	controller: 'station',
	      controllerUrl: 'js/station'
	    })
		).when("/page",
	    angularAMD.route({
	    	templateUrl: 'tpl/page.html',
	     	controller: 'page',
	      controllerUrl: 'js/page'
	    })
		).when("/stationsensor",
	    angularAMD.route({
	    	templateUrl: 'tpl/stationsensor.html',
	     	controller: 'stationsensor',
	      controllerUrl: 'js/stationsensor'
	    })
		);

		var interceptor = function($window){
      function success(response){
      	if(response.data){
      		if(response.data.error == 1){
        		return error(response);
        	}
      	}
       	return response;
      };
      function error(response) {
        if(response.data.error == 1){
          alert('error', response.data.message);
        }
        return response;
      };
      return function(promise) {
        return promise.then(success, error);
      }
    }

    $httpProvider.responseInterceptors.push(interceptor);

	});

  return angularAMD.bootstrap(angular.module('sensul'));
});