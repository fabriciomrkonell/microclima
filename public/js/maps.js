'use strict';

define(['js/index', 'morris'], function (app, morris) {
	app.controller('maps', ['$scope', '$http', '$rootScope', 'Views', function($scope, $http, $rootScope, Views){

		var defaultHeight = 129,
        image = 'img/flag.png';

    $http.get('/api/stations/sensors').success(function(data){

      $scope.stations = data.data;

      for(var i = 0; i < $scope.stations.length; i++){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng($scope.stations[i].latitude, $scope.stations[i].longitude),
          map: map,
          icon: image,
          station: $scope.stations[i]
        });

        google.maps.event.addListener(marker, 'click', (function(marker, i) {
          return function() {
            $scope.data = marker.station;
            if($scope.data.StationSensors.length > 0){
              $scope.configurations.active = $scope.data.StationSensors[0].SensorId;
              $scope.configurations.search = $scope.data.StationSensors[0];
              $('#modal').modal();
            }else{
              alert('error', 'Não existe nenhum sensor nesta estação!');
            }
            $rootScope.$digest();
          }
        })(marker, i));

      }
    });

    $('#modal').on('shown.bs.modal', function (){
      $scope.getSensorData($scope.configurations.search.SensorId, $scope.configurations.search.StationId);
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
      data: {
        data: [],
        dataValues: []
      },
      configurations:{
        search: {},
        active: 0
      },
      loader: true,
      type: 'Bar',
      types: [
        { name: 'Barra', value: 'Bar' },
        { name: 'Linha', value: 'Line' }
      ]
    });

    $scope.getSensorData = function(sensor, station){
      $scope.configurations.active = sensor;

      $http.post('/api/sensordata/data', {
        data: {
          SensorId: sensor,
          StationId: station
        }
      }).success(function(data){
        $scope.data.dataValues = data.data;
        $scope.showView($scope.type, data.data);
      });
    };

    $scope.showView = function(type, data){
      setDiv();
      Views.showView(type, data);
      showView();
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

	}]);
});