'use strict';

define(['js/index'], function (app) {
	app.controller('stationsensor', ['$scope', '$http', function($scope, $http){

		angular.extend($scope, {
			stationssensors: []
		});

		function getAll(){
			$http.get('/api/stationssensors').success(function(data){
				$scope.stationssensors = data.data;
			});
		};

		getAll();

		$scope.save = function(station, sensor, id){
			$http.post('/api/stationssensors', { StationId: station, SensorId: sensor }).success(function(){
				getAll();
			});
		};

		$scope.isCheck = function(station, sensor){
			for(var i = 0; i < $scope.stationssensors.stationssensors.length; i++){
				if($scope.stationssensors.stationssensors[i].StationId == station && $scope.stationssensors.stationssensors[i].SensorId == sensor){
					i = $scope.stationssensors.stationssensors.length;
					return true;
				}
			}
			return false;
		};

		$scope.delete = function(station){
			$http.delete('/api/stations/' + station).success(function(){
				getAll();
			});
		};

	}]);
});