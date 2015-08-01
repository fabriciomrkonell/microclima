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

	}]);

	angular.module('sensul').service('Chart', function(){

		function propComparator(prop) {
    	return function(a, b) {
        return a[prop] - b[prop];
    	}
		}

  	this.showChart = function(type, data, label){

  		data = [{"valueData":"22.8","dateCreate":"2015-07-31 00:02"},{"valueData":"22.8","dateCreate":"2015-07-31 00:11"},{"valueData":"22.8","dateCreate":"2015-07-31 00:19"},{"valueData":"22.7","dateCreate":"2015-07-31 00:27"},{"valueData":"22.7","dateCreate":"2015-07-31 00:36"},{"valueData":"22.7","dateCreate":"2015-07-31 00:44"},{"valueData":"22.7","dateCreate":"2015-07-31 00:52"},{"valueData":"22.7","dateCreate":"2015-07-31 01:01"},{"valueData":"22.6","dateCreate":"2015-07-31 01:09"},{"valueData":"22.6","dateCreate":"2015-07-31 01:17"},{"valueData":"22.6","dateCreate":"2015-07-31 01:26"},{"valueData":"22.6","dateCreate":"2015-07-31 01:34"},{"valueData":"22.6","dateCreate":"2015-07-31 01:42"},{"valueData":"22.6","dateCreate":"2015-07-31 01:51"},{"valueData":"22.5","dateCreate":"2015-07-31 01:59"},{"valueData":"22.5","dateCreate":"2015-07-31 02:07"},{"valueData":"22.5","dateCreate":"2015-07-31 02:16"},{"valueData":"22.4","dateCreate":"2015-07-31 02:24"},{"valueData":"22.4","dateCreate":"2015-07-31 02:32"},{"valueData":"22.4","dateCreate":"2015-07-31 02:41"},{"valueData":"22.4","dateCreate":"2015-07-31 02:49"},{"valueData":"22.4","dateCreate":"2015-07-31 02:57"},{"valueData":"22.4","dateCreate":"2015-07-31 03:06"},{"valueData":"22.3","dateCreate":"2015-07-31 03:14"},{"valueData":"22.3","dateCreate":"2015-07-31 03:22"},{"valueData":"22.2","dateCreate":"2015-07-31 03:31"},{"valueData":"22.2","dateCreate":"2015-07-31 03:39"},{"valueData":"22.2","dateCreate":"2015-07-31 03:47"},{"valueData":"22.2","dateCreate":"2015-07-31 03:56"},{"valueData":"22.2","dateCreate":"2015-07-31 04:04"},{"valueData":"22.1","dateCreate":"2015-07-31 04:12"},{"valueData":"22.1","dateCreate":"2015-07-31 04:21"},{"valueData":"22.1","dateCreate":"2015-07-31 04:29"},{"valueData":"22.1","dateCreate":"2015-07-31 04:38"},{"valueData":"22.1","dateCreate":"2015-07-31 04:46"},{"valueData":"22","dateCreate":"2015-07-31 04:54"},{"valueData":"22","dateCreate":"2015-07-31 05:03"},{"valueData":"22","dateCreate":"2015-07-31 05:11"},{"valueData":"22","dateCreate":"2015-07-31 05:19"},{"valueData":"22","dateCreate":"2015-07-31 05:28"},{"valueData":"22","dateCreate":"2015-07-31 05:36"},{"valueData":"21.9","dateCreate":"2015-07-31 05:44"},{"valueData":"21.9","dateCreate":"2015-07-31 05:53"},{"valueData":"21.9","dateCreate":"2015-07-31 06:01"},{"valueData":"21.8","dateCreate":"2015-07-31 06:09"},{"valueData":"21.8","dateCreate":"2015-07-31 06:18"}];

  		var ymax = data;
  		if(ymax.length > 0){
  			ymax = parseFloat(ymax.sort(propComparator('valueData')).reverse()[0].valueData);
  		}else{
  			ymax = 0;
  		}

  		var ymin = data;
  		if(ymin.length > 0){
  			ymin = parseFloat(ymin.sort(propComparator('valueData'))[0].valueData);
  		}else{
  			ymin = 0;
  		}


  		var interval = (ymax - ymin) * 0.1;
  		ymax = parseFloat((ymax + interval).toFixed(2));
  		ymin = parseFloat((ymin - interval).toFixed(2));


  		var configs = {
        element: 'charts',
        data: data,
        xkey: 'dateCreate',
        ykeys: ['valueData'],
        ymin: ymin,
        ymax: ymax,
        labels: [label],
       	xLabelFormat: function(date) {
        	var d = new Date(date.label || date);
         	return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        },
        dateFormat: function(date) {
          var d = new Date(date);
         	return (d.getHours() < 10 ? '0' : '') + d.getHours() + ':' + (d.getMinutes() < 10 ? '0' : '') + d.getMinutes();
        },
  		};

    	if(type == 'Line'){
    		return new Morris.Line(configs);
    	}else{
    		return new Morris.Bar(configs);
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
		groups: [{
			id: 1,
			name: 'Administrador',
		}, {
			id: 2,
			name: 'Cliente'
		}],
		sensors: [],
		stations: [],
		users: [],
		chartsDefault: 'Line',
		flagMaps: 'img/flag.png'
	});

	angular.module('sensul').config(function ($locationProvider, $routeProvider, $httpProvider) {

	 	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
		});

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
		).when("/users",
	    angularAMD.route({
	    	templateUrl: 'tpl/users.html',
	     	controller: 'users',
	      controllerUrl: 'js/users'
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
		).when("/profile",
	    angularAMD.route({
	    	templateUrl: '/tpl/profile.html',
	     	controller: 'profile',
	      controllerUrl: 'js/profile'
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
		).otherwise({
			redirectTo: '/'
		});


		$httpProvider.interceptors.push(function($q) {
  		return {
    		'response': function(response) {
    			if(response.data){
	      		if(response.data.error == 1){
	      			alert(response.data.message);
	        		return $q.reject(response);
	        	}
	        	if(response.data.error == 2){
	      			window.location = '/logout';
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