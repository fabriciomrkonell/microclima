'use strict';

define(['js/index', 'morris', 'datetimepicker'], function (app, morris, datetimepicker) {
	app.controller('maps', ['$scope', '$http', '$rootScope', 'Chart', 'Values', function($scope, $http, $rootScope, Chart, Values){

    $scope.daterange = {};

    angular.extend($scope.daterange, {
      startDate: getHours(new Date()),
      endDate: getHours(new Date())
    });

    $('#daterange').daterangepicker({
        startDate: $scope.daterange.startDate,
        endDate: $scope.daterange.endDate,
        timePicker24Hour: true,
        timePicker: true,
        timePickerIncrement: 30,
        locale: {
          format: 'DD/MM/YYYY hh:mm'
        }
    }, function(start, end, label){
      angular.extend($scope.daterange, {
        startDate: getHours(start._d),
        endDate: getHours(end._d)
      });
      if(!$scope.$$phase){
        $scope.$digest();
      }
    });

		var defaultHeight = 129;

    $http.get('/api/stations/sensors').success(function(data){

      $scope.stations = data.data;

      for(var i = 0; i < $scope.stations.length; i++){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng($scope.stations[i].latitude, $scope.stations[i].longitude),
          map: map,
          icon: Values.flagMaps,
          station: $scope.stations[i]
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            $scope.data.station = marker.station;
            if(marker.station.StationSensors.length > 0){
              $scope.configurations.active = marker.station.StationSensors[0].SensorId;
              $scope.configurations.search = marker.station.StationSensors[0];
              $('#modal').modal();
            }else{
              alert('Não existe nenhum sensor nesta estação!');
            }
            $rootScope.$digest();
          }
        })(marker, i));

      }
    });

    $('#modal').on('shown.bs.modal', function (){
      $scope.getSensorData($scope.configurations.search.SensorId, $scope.data.station.id);
    });

    $('#modal').on('hidden.bs.modal', function (){
      setDiv();
    });

		$("#map").height($(window).height() - defaultHeight);

		$(window).resize(function() {
			$("#map").height($(window).height() - defaultHeight);
		});

    var myOptions = {
      zoom: 8,
      center: new google.maps.LatLng(-26.494561, -49.1048534),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false,
      disableDefaultUI: true
    }

    var map = new google.maps.Map(document.getElementById("map"), myOptions);

    angular.extend($scope, {
      stations: [],
      data: {
        station: {}
      },
      configurations:{
        search: {},
        active: false
      },
      loader: true,
      typeDefault: Values.chartsDefault,
      types: Values.charts
    });

    $scope.getSensorData = function(sensor, station){
      setDiv();
      $scope.configurations.active = sensor;
      $http.post('/api/sensordata/data', {
        data: {
          SensorId: sensor,
          StationId: station
        },
        daterange: $scope.daterange
      }).success(function(data){
        $scope.configurations.search.sensorData = data.data;
        $scope.showView($scope.typeDefault, $scope.configurations.search.sensorData);
      });
    };

    $scope.showView = function(typeDefault, data){
      setDiv();
      Chart.showChart(typeDefault, data, $scope.getNameSensor());
      showView();
    };

    $scope.getNameSensor = function(){
      for(var i = 0; i <= $scope.data.station.StationSensors.length; i++){
        if($scope.data.station.StationSensors[i].SensorId == $scope.configurations.active){
          return $scope.data.station.StationSensors[i].Sensor.description;
        }
      }
      return "Valor";
    };

    function showView(){
      $('#tab-content').css('display', 'flex');
      $scope.loader = false;
      if(!$scope.$$phase){
        $scope.$digest();
      }
    };

    function setDiv(){
      $("#charts").text("");
      $('#tab-content').css('display', '');
      $scope.loader = true;
      if(!$scope.$$phase){
        $scope.$digest();
      }
    };

    function getHours(date){
      var d = new Date(date);
      d.setHours(d.getHours())
      return d;
    };

	}]);
});