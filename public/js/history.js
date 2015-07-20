'use strict';

define(['js/index'], function (app) {
	app.controller('history', ['$scope', '$http', 'Canvas', '$timeout', 'Chart', 'Values', '$routeParams', '$location', function($scope, $http, Canvas, $timeout, Chart, Values, $routeParams, $location){

    var myDate = new Date();

    angular.extend($scope, {
      active: Values.history.greenhouse || Values.favorite || null,
      activeEdit: $routeParams.idGreenHouse,
      sensorActive: Canvas.getSensor(),
      greenhouses: Values.greenhouses || [],
      dataFilter: {
        dateInit: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 0, 0),
        dateFinish: new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), 23, 59)
      }
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
        }, 100);
        $scope.refreshCharts();
      }else{
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    };

    $scope.refreshCharts = function(){
      $scope.sensorActive = Canvas.getSensor();
      var chart1 = { };
      chart1 = {
        "cols": [
          {
            id: "date",
            label: "Date",
            type: "string"
          }, {
            id: "data",
            label: "Valor",
            type: "number"
          }
        ],
        "rows": [
          {c: [
              {v: "10:00"},
              {v: Math.random() * 50 }
          ]},
          {c: [
              {v: "11:00"},
              {v: Math.random() * 50 }
          ]},
          {c: [
              {v: "12:00"},
              {v: Math.random() * 50 }
          ]}
      ]};

      $scope.chart = Chart.configs({ data: chart1 , sensor: "dasd" });

      if (!$scope.$$phase) {
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
      Canvas.setSensor(data.id, '/history', false);
      $scope.refreshCharts();
    });

    $scope.getNameGreenHouse = function(idGreenHouse){
      for(var i = 0; i < $scope.greenhouses.length; i++){
        if($scope.greenhouses[i].id == idGreenHouse){
          return $scope.greenhouses[i].description;
        }
      }
    };

    $scope.isValidId = function(){
      $timeout(function(){
        if($routeParams.idGreenHouse){
          var flag = true;
          for(var i = 0; i < $scope.greenhouses.length; i++){
            if($scope.greenhouses[i].id == $routeParams.idGreenHouse){
              flag = false;
            }
          }
          if(flag){
            $location.path('/history');
          }
        }
      })
    };
	}]);
});