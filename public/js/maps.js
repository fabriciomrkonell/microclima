'use strict';

define(['js/index', 'morris', 'datetimepicker'], function (app, morris, datetimepicker) {
	app.controller('maps', ['$scope', '$http', '$rootScope', 'Chart', 'Values', function($scope, $http, $rootScope, Chart, Values){

    $scope.daterange = {};

    var _date = new Date();

    $('#daterange').daterangepicker({
        startDate: new Date(_date.getFullYear(), _date.getMonth(), _date.getDate(), 0, 0),
        endDate: _date,
        timePicker24Hour: true,
        timePicker: true,
        timePickerIncrement: 5,
        locale: {
          format: 'DD/MM/YYYY HH:mm'
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
              $scope.configurations.active = -1;
              $scope.geral = [];
              $('#modal').modal();
            }else{
              alert('Não existe nenhum sensor nesta estação!');
            }
            $rootScope.$digest();
          }
        })(marker, i));

      }
    });

    $('#modal').on('shown.bs.modal', function (e){
      $scope.getSensorDataGeral($scope.data.station.id);
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
      geral: [],
      data: {
        station: {}
      },
      configurations:{
        search: {},
        active: false
      },
      loader: 1,
      typeDefault: Values.chartsDefault,
      types: Values.charts
    });

    $scope.getSensorData = function(sensor, station){
      if(getValidDate($('#daterange').val().split(" - ")[0], $('#daterange').val().split(" - ")[1])){
        setDiv();
        $scope.configurations.active = sensor;
        $http.post('/api/sensordata/data', {
          data: {
            SensorId: sensor,
            StationId: station
          },
          daterange: {
            startDate: convertDateJQueryToAngular($('#daterange').val().split(" - ")[0]),
            endDate: convertDateJQueryToAngular($('#daterange').val().split(" - ")[1])
          }
        }).success(function(data){
          $scope.configurations.search.sensorData = data.data;
          $scope.showView($scope.typeDefault, $scope.configurations.search.sensorData);
        });
      }
    };

    $scope.getSensorDataGeral = function(station){
      setDiv();
      $scope.configurations.active = -1;
      $http.get('/api/sensordata/station/' + station).success(function(data){
        $scope.geral = data.data;
        $scope.loader = 3;
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
      $scope.loader = 2;
      if(!$scope.$$phase){
        $scope.$digest();
      }
    };

    function setDiv(){
      $("#charts").text("");
      $('#tab-content').css('display', '');
      $scope.loader = 1;
      if(!$scope.$$phase){
        $scope.$digest();
      }
    };

    function convertDateJQueryToAngular(date){
      var d = new Date();
      d.setDate(date.split("/")[0]);
      d.setMonth(date.split("/")[1] - 1);
      d.setFullYear(date.split("/")[2].split(" ")[0]);
      d.setHours(parseInt(date.split("/")[2].split(" ")[1].split(":")[0]) - 3);
      d.setMinutes(date.split("/")[2].split(" ")[1].split(":")[1]);
      d.setSeconds(0);
      return d;
    };

    function getValidDate(startDate, endDate){
      var comparation = "Data inválida!";
      if(startDate == comparation || endDate == comparation){
        alert(comparation);
        return false;
      }
      return true;
    };

	}]);
});