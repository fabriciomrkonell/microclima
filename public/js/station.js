'use strict';

define(['js/index'], function (app) {
	app.controller('station', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			data: {
				id: null,
				description: '',
				latitude: 0,
				longitude: 0
			},
			stations: []
		});

		function getAll(){
			$http.get('/api/stations').success(function(data){
				$scope.stations = data.data;
			});
			angular.extend($scope.data, {
				id: null,
				description: '',
				latitude: 0,
				longitude: 0
			});
		};

		getAll();

		$scope.getAll = function(){
			getAll();
		};

		$scope.save = function(station){
			$http.post('/api/stations', station).success(function(){
				getAll();
			});
		};

		$scope.edit = function(station){
			$scope.data = station;
		};

		$scope.delete = function(station){
			$http.delete('/api/stations/' + station).success(function(){
				getAll();
			});
		};

	}]);
});