'use strict';

define(['js/index'], function (app) {
	app.controller('station', ['$scope', '$http', 'Values', '$timeout', function($scope, $http, Values, $timeout){

		angular.extend($scope, {
			data: {
				id: null,
				description: '',
				latitude: 0,
				longitude: 0
			},
			stationssensors: [],
			stations: Values.stations,
			sensors: Values.sensors,
			stationActive: null
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

		$scope.getSensors = function(idSensor){
			$scope.stationActive = idSensor;
			$scope.stationssensors = [];
      $http.get('/api/stationssensors/' + idSensor).success(function(data){
        $scope.stationssensors = data.data;
        $timeout(function(){
          $("#modalSensors").modal();
        });
      });
		};

		$scope.saveStationSensor = function(station, sensor){
      $http.post('/api/stationssensors', { StationId: station, SensorId: sensor });
    };

    $scope.isCheck = function(sensor){
      for(var i = 0; i < $scope.stationssensors.length; i++){
        if($scope.stationssensors[i].SensorId == sensor){
          i = $scope.stationssensors.length;
          return true;
        }
      }
      return false;
    };

		if($scope.stations.length == 0){
			getAll();
		}

		if($scope.sensors.length == 0){
			$http.get('/api/sensors').success(function(data){
				$scope.sensors = data.data;
				angular.extend(Values, {
					sensors: data.data
				});
			});
		}

	}]);
});