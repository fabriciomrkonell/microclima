'use strict';

define(['js/index'], function (app) {
	app.controller('realtime', ['$scope', '$http', 'Canvas', '$timeout', 'Chart', 'Values', '$location', function($scope, $http, Canvas, $timeout, Chart, Values, $location){

    angular.extend($scope, {
      active: Values.favorite,
      greenhouses: Values.greenhouses || []
    });

    $scope.$on('$viewContentLoaded', function(scope, next, current){
      $timeout(function(){
        $scope.refresh($scope.active);
      });
    });

    $scope.refresh = function(greenhouse){
      if(parseInt(greenhouse)){
        $timeout(function(){
          for(var i = 0; i < $scope.greenhouses.length; i++){
            if($scope.greenhouses[i].id == greenhouse){
              greenhouse = $scope.greenhouses[i];
            }
          }
          if(angular.isObject(greenhouse)){
            Canvas.setXY(greenhouse.x, greenhouse.y);
            Canvas.show(greenhouse.id, greenhouse.configs);
          }
          $scope.refreshCharts();
        });
      }else{
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    };

    $scope.refreshCharts = function(){
      var chart1 = { };
      chart1 = {
        "cols": [
          {
            id: "date",
            label: "Date",
            type: "string"
          }, {
            id: "temperatura",
            label: "Valor",
            type: "number"
          }, {
            id: "humidade",
            label: "Valor",
            type: "number"
          }
        ],
        "rows": [
          {c: [
              {v: "Ponto 1"},
              {v: Math.random() * 50 },
              {v: Math.random() * 50 }
          ]},
          {c: [
              {v: "Ponto 2"},
              {v: Math.random() * 50 },
              {v: Math.random() * 50 }
          ]},
          {c: [
              {v: "Ponto 3"},
              {v: Math.random() * 50 },
              {v: Math.random() * 50 }
          ]}
      ]};

      $scope.chart = Chart.configs({ data: chart1 , sensor: "dasd" });

      if(!$scope.$$phase) {
        $scope.$apply();
      }
    };

    $scope.$on('Values:favorite', function(event, data) {
      $scope.active = data;
      $scope.refresh(data);
    });

    $scope.$on('Values:greenhouses', function(event, data) {
      $scope.greenhouses = data;
    });

    Canvas.clicked(function(data){
      $location.path('/history/' + data.GreenHouseId);
      angular.extend(Values, {
        history: {
          greenhouse: data.GreenHouseId
        }
      });
      Canvas.setSensor(data.id, '/history/' + data.GreenHouseId, true);
      if(!$scope.$$phase) {
        $scope.$apply();
      }
    });


	}]);
});