'use strict';

define(['js/index'], function (app) {
	app.controller('maps', ['$scope', '$http', function($scope, $http){

		var defaultHeight = 129,
        image = 'img/flag.png';

    $http.get('/api/stations').success(function(data){
      $scope.stations = data.data;
      for(var i = 0; i < $scope.stations.length; i++){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng($scope.stations[i].latitude, $scope.stations[i].longitude),
          map: map,
          icon: image,
          station: $scope.stations[i]
        });

        google.maps.event.addListener(marker, 'click', function(a,b,c,d,e) {
          $('#modal').modal();
        });
      }
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

	}]);
});