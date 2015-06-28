'use strict';

define(['js/index'], function (app) {
	app.controller('sensor', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			data: {
				id: null,
				description: ''
			},
			sensors: []
		});

		function getAll(){
			$http.get('/api/sensors').success(function(data){
				$scope.sensors = data.data;
			});
			angular.extend($scope.data, {
				id: null,
				description: ''
			});
		};

		getAll();

		$scope.save = function(sensor){
			$http.post('/api/sensors', sensor).success(function(){
				getAll();
			});
		};

		$scope.edit = function(sensor){
			$scope.data = sensor;
		};

		$scope.delete = function(sensor){
			$http.delete('/api/sensors/' + sensor).success(function(){
				getAll();
			});
		};

	}]);
});