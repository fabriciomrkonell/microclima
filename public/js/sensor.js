'use strict';

define(['js/index'], function (app) {
	app.controller('sensor', ['$scope', '$http', 'Values', function($scope, $http, Values){

		angular.extend($scope, {
			data: {
				id: null,
				description: '',
				unit: null
			},
			sensors: Values.sensors,
			units: Values.units
		});

		function getAll(){
			$http.get('/api/sensors').success(function(data){
				$scope.sensors = data.data;
				angular.extend(Values, {
      		sensors: data.data
      	});
			});
			angular.extend($scope.data, {
				id: null,
				description: '',
				unit: null
			});
		};

		$scope.getAll = function(){
			getAll();
		};

		$scope.save = function(sensor){
			$http.post('/api/sensors', sensor).success(function(){
				getAll();
			});
		};

		$scope.edit = function(sensor){
			$scope.data = sensor;
		};

		if($scope.sensors.length == 0){
			getAll();
		}

	}]);
});