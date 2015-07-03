'use strict';

define(['angularAMD', 'ngRoute', 'ngAnimate'], function (angularAMD, ngRoute, ngAnimate) {

	angular.module('sensul', ['ngRoute', 'ngAnimate']);

	angular.module('sensul').run(['$rootScope', '$route', function($rootScope){

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

	angular.module('sensul').service('Views', function(){
  	this.showView = function(type, data){

  		var configs = {
        element: 'charts',
        data: data,
        xkey: 'dateCreate',
        ykeys: ['valueData'],
        labels: ['Value']
  		};

    	if(type == 'Line'){
    		new Morris.Line(configs);
    	}else{
    		new Morris.Bar(configs);
    	}
  	}
	});

	angular.module('sensul').value('Values', {
		charts: [{
			name: 'Linha',
			value: 'Line'
		}, {
			name: 'Barra',
			value: 'Bar'
		}],
		chartsDefault: 'Line',
		flagMaps: 'img/flag.png'
	});

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
		).when("/group",
	    angularAMD.route({
	    	templateUrl: 'tpl/group.html',
	     	controller: 'group',
	      controllerUrl: 'js/group'
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

		$httpProvider.interceptors.push(function($q) {
  		return {
    		'response': function(response) {
    			if(response.data){
	      		if(response.data.error == 1){
	      			alert('error', response.data.message);
	        		return $q.reject(response);
	        	}
	      	}
	       	return response;
    		}
  		};
		});

	});

  return angularAMD.bootstrap(angular.module('sensul'));
});